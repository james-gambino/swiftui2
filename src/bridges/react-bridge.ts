import { createRoot, type Root } from 'react-dom/client';
import {
    CleanupFunction,
    ReactComponent,
    ReactProps,
    VueComponent
} from "@/bridges/bridge.types.ts";
import {createElement} from "react";

export class ReactBridge {
    private roots = new Map<HTMLElement, Root>();

    mount(Component: ReactComponent, target: HTMLElement, props?: ReactProps): CleanupFunction {
        const { key, ref, children, ...restProps } = props || {};

        const element = children
            ? createElement(Component, { ...restProps, key, ref }, children)
            : createElement(Component, { ...restProps, key, ref });


        let root = this.roots.get(target);
        if (!root) {
            root = createRoot(target);
            this.roots.set(target, root);
        }

        root.render(element);

        return () => this.unmount(target);
    }

    unmount(target: HTMLElement): void {
        const root = this.roots.get(target);
        if (root) {
            root.unmount();
            this.roots.delete(target);
        }
    }

    // Рендерим Vue внутри React (через портал)
    renderVue(vueComponent: VueComponent, target: HTMLElement, props?: Record<string, unknown>): CleanupFunction {
        const { createVNode, render } = require('vue');
        const vnode = createVNode(vueComponent, props);
        render(vnode, target);

        return () => render(null, target);
    }
}