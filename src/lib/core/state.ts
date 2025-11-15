type State = { count: number };
type Listener = (state: State) => void;

export class SharedState {
    private state: State = { count: 0 };
    private listeners = new Set<Listener>();

    subscribe(listener: Listener): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    increment() {
        this.state.count++;
        this.notify();
    }

    setCount(value: number) {
        this.state.count = value;
        this.notify();
    }

    getState(): State {
        return { ...this.state };
    }

    private notify() {
        this.listeners.forEach(l => l(this.state));
    }
}

export const globalState = new SharedState();