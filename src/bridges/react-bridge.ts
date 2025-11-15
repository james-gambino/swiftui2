import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import {NaiveDOM} from "@/lib/core/framework.ts";

export function createReactBridge(naive: NaiveDOM) {
    return {
        register(name: string, Component: React.ComponentType<any>) {
            naive.register(name, (props, container) => {
                const wrapper = document.createElement('div');
                container.appendChild(wrapper);

                const root = createRoot(wrapper);
                root.render(createElement(Component, props));

                return {
                    element: wrapper,
                    cleanup: () => root.unmount()
                };
            });
        }
    };
}