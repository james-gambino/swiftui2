// src/bridges/VueInReact.tsx
import {useEffect, useRef, useState} from 'react';
import { createVNode, render } from 'vue';
import type { Component as VueComponent } from 'vue';

interface VueInReactProps {
    component: VueComponent;
    props?: Record<string, unknown>;
    on?: Record<string, Function>; // Vue event listeners
}

export const VueInReact: React.FC<VueInReactProps> = ({ component, props = {} }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (!containerRef.current) return;

        const vnode = createVNode(component, props);
        render(vnode, containerRef.current);

        setIsMounted(true);

        return () => {
            setIsMounted(false);

            queueMicrotask(() => {
                if (containerRef.current && containerRef.current.parentNode) {
                    render(null, containerRef.current);
                }
            });
        };
    }, [component]);

    useEffect(() => {
        if (!containerRef.current || !isMounted) return;

        // Атомарное обновление props без пересоздания
        const vnode = createVNode(component, props);
        render(vnode, containerRef.current);
    }, [props, isMounted]);

    return <div ref={containerRef} className="vue-portal-container" />;
};