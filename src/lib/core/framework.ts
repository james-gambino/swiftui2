import {
    CleanupFunction,
    ComponentRenderer,
    CrossFrameworkBridge,
    ReactComponent,
    VueComponent
} from "@/bridges/bridge.types.ts";
import {ReactBridge} from "@/bridges/react-bridge.ts";
import {VueBridge} from "@/bridges/vue-bridge.ts";


class NaiveDOM implements CrossFrameworkBridge {
    private registry = new Map<string, ComponentRenderer>();
    private instances = new Map<HTMLElement, { renderer: ComponentRenderer; cleanup: CleanupFunction }>();
    private reactBridge = new ReactBridge();
    private vueBridge = new VueBridge();

    // Основные методы
    register(name: string, renderer: ComponentRenderer): void {
        if (this.registry.has(name)) {
            console.warn(`[NaiveDOM] Компонент "${name}" уже зарегистрирован.`);
        }
        this.registry.set(name, renderer);
    }

    mount(name: string, target: HTMLElement, props?: Record<string, unknown>): CleanupFunction {
        if (this.instances.has(target)) {
            console.warn(`[NaiveDOM] Элемент уже занят. Размонтирую.`);
            this.unmount(target);
        }

        const renderer = this.registry.get(name);
        if (!renderer) {
            throw new Error(`[NaiveDOM] Компонент "${name}" не найден.`);
        }

        const cleanup = renderer.mount(target, props);
        this.instances.set(target, { renderer, cleanup });
        return () => this.unmount(target);
    }

    unmount(target: HTMLElement): void {
        const instance = this.instances.get(target);
        if (instance) {
            instance.cleanup();
            this.instances.delete(target);
        }
    }

    unmountAll(): void {
        this.instances.forEach((_, target) => this.unmount(target));
        this.instances.clear();
    }

    getStats() {
        return {
            registered: this.registry.size,
            mounted: this.instances.size,
            components: Array.from(this.instances.entries()).map(([el, _]) => ({
                element: el.tagName,
                id: el.id || 'no-id'
            }))
        };
    }

    // --- УДОБНЫЕ РЕГИСТРАТОРЫ (вот где магия) ---

    public registerReact(name: string, Component: ReactComponent): void {
        this.register(name, {
            mount: (target, props) => this.reactBridge.mount(Component, target, props)
        });
    }

    public registerVue(name: string, Component: VueComponent): void {
        this.register(name, {
            mount: (target, props) => this.vueBridge.mount(Component, target, props)
        });
    }

    public registerNative(name: string, factory: (props?: Record<string, unknown>) => HTMLElement): void {
        this.register(name, {
            mount: (target, props) => {
                const element = factory(props);
                target.appendChild(element);
                return () => element.remove();
            }
        });
    }

    // --- Кросс-рендеринг ---

    public renderInReact(vueComponent: VueComponent, target: HTMLElement, props?: Record<string, unknown>): CleanupFunction {
        return this.vueBridge.mount(vueComponent, target, props);
    }

    public renderInVue(reactComponent: ReactComponent, target: HTMLElement, props?: Record<string, unknown>): CleanupFunction {
        return this.reactBridge.renderVue(reactComponent, target, props);
    }
}

export const naiveDOM = new NaiveDOM();
if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => naiveDOM.unmountAll());
}