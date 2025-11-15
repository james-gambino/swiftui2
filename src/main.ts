import './index.css';
import { naiveDOM } from '@/lib/core/framework';
import { ShadcnButton } from '@/components/react/shadcn-button';
import PrimevueButton from '@/components/vue/primevue-button.vue';
import VueCounterDisplay from '@/components/vue/counter-display.vue';
import { ShadcnInput } from '@/components/react/shadcn-input';
import { ShadcnDialog } from '@/components/react/shadcn-dialog';

naiveDOM.registerReact('ShadcnButton', ShadcnButton);
naiveDOM.registerReact('ShadcnInput', ShadcnInput);
naiveDOM.registerReact('ShadcnDialog', ShadcnDialog);
naiveDOM.registerVue('PrimevueButton', PrimevueButton);
naiveDOM.registerVue('VueCounterDisplay', VueCounterDisplay);

// Монтирование с проверкой
const safeMount = (name: string, slotId: string, props = {}) => {
    const slot = document.getElementById(slotId);
    if (slot) naiveDOM.mount(name, slot, props);
};

safeMount('VueCounterDisplay', 'counter-slot');
safeMount('ShadcnDialog', 'dialog-slot');
safeMount('ShadcnButton', 'react-slot', { label: 'Нажми меня' });
safeMount('PrimevueButton', 'vue-slot', { label: 'Нажми меня' });
safeMount('ShadcnInput', 'input-slot', { placeholder: 'Введите и нажмите Enter' });