type Cleanup = () => void;
type ComponentRenderer = (props: any, container: HTMLElement) => HTMLElement | { element: HTMLElement; cleanup?: Cleanup };

export class NaiveDOM {
    private container: HTMLElement;
    private components = new Map<string, ComponentRenderer>();
    private mounted = new Map<string, { element: HTMLElement; cleanup?: Cleanup }>();

    constructor(container: HTMLElement) {
        this.container = container;
    }

    register(name: string, renderer: ComponentRenderer) {
        this.components.set(name, renderer);
    }

    render(componentName: string, props: any = {}, target?: HTMLElement | null) {
        const renderer = this.components.get(componentName);
        if (!renderer) throw new Error(`Component "${componentName}" not found`);

        const mountPoint = target || this.container;
        const key = target ? `target-${target.id || 'unknown'}` : 'root';

        const prev = this.mounted.get(key);
        if (prev?.cleanup) prev.cleanup();

        const result = renderer(props, mountPoint);
        const element = 'element' in result ? result.element : result;

        this.mounted.set(key, {
            element,
            cleanup: 'cleanup' in result ? result.cleanup : undefined
        });
    }

    unmount(target?: HTMLElement | null) {
        const key = target ? `target-${target.id || 'unknown'}` : 'root';
        const mounted = this.mounted.get(key);
        if (mounted?.cleanup) mounted.cleanup();
        this.mounted.delete(key);
    }
}