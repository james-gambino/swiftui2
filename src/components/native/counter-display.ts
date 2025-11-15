
import { globalState } from '@/lib/core/state';

export function createCounterDisplay() {
    const container = document.createElement('div');
    container.className = 'counter-display p-4 bg-gray-100 rounded';

    const label = document.createElement('span');
    label.textContent = 'Counter ';

    const value = document.createElement('strong');
    value.textContent = '0';

    container.append(label, value);

    const unsubscribe = globalState.subscribe((state) => {
        value.textContent = state.count.toString();
    });

    return {
        element: container,
        cleanup: unsubscribe
    };
}