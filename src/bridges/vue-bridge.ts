import { createVNode, render as vueRender } from 'vue';
import {NaiveDOM} from "@/lib/core/framework.ts";

export function createVueBridge(naive: NaiveDOM) {
    return {
        register(name: string, component: any) {
            naive.register(name, (props, container) => {
                const wrapper = document.createElement('div');
                container.appendChild(wrapper);

                const vnode = createVNode(component, props);
                vueRender(vnode, wrapper);

                return {
                    element: wrapper,
                    cleanup: () => {
                        // Уничтожаем компонент
                        vueRender(null, wrapper);
                        wrapper.remove();
                    }
                };
            });
        }
    };
}