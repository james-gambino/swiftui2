// src/bridges/VueInReact.tsx
import { useEffect, useRef } from 'react';
import { createVNode, render } from 'vue';
import type { Component as VueComponent } from 'vue';

interface VueInReactProps {
    component: VueComponent;
    props?: Record<string, unknown>;
    on?: Record<string, Function>; // Vue event listeners
}

export const VueInReact: React.FC<VueInReactProps> = ({ component, props = {}, on = {} }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cleanupRef = useRef<() => void>();

    useEffect(() => {
        if (!containerRef.current) return;

        // Создаем контейнер для Vue-реактивности
        const vnode = createVNode(component, {
            ...props,
            // Преобразуем React-обработчики в Vue-эвенты
            ...Object.fromEntries(
                Object.entries(on).map(([key, handler]) => [
                    `on${key.charAt(0).toUpperCase() + key.slice(1)}`,
                    handler
                ])
            )
        });

        render(vnode, containerRef.current);

        cleanupRef.current = () => {
            render(null, containerRef.current!);
        };

        return cleanupRef.current;
    }, [component, JSON.stringify(props), JSON.stringify(on)]);

    return <div ref={containerRef} className="vue-portal-container" />;
};