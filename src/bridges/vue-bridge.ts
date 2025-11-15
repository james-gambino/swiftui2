import { createVNode, render, type VNode } from 'vue';
import { createRoot } from 'react-dom/client';
import {CleanupFunction, ReactComponent, ReactProps, VueComponent} from "@/bridges/bridge.types.ts";

export class VueBridge {
    private vnodes = new Map<HTMLElement, VNode>();

    mount(component: VueComponent, target: HTMLElement, props?: Record<string, unknown>): CleanupFunction {
        const vnode = createVNode(component, props);
        render(vnode, target);
        this.vnodes.set(target, vnode);
        return () => this.unmount(target);
    }

    unmount(target: HTMLElement): void {
        const vnode = this.vnodes.get(target);
        if (vnode) {
            render(null, target);
            this.vnodes.delete(target);
        }
    }

    // Рендерим React-компонент внутри Vue (через портал)
    renderReact(reactComponent: ReactComponent, target: HTMLElement, props?: ReactProps): CleanupFunction {
        const root = createRoot(target);
        const { createElement } = require('react');
        const element = createElement(reactComponent, props);
        root.render(element);
        return () => root.unmount();
    }
}