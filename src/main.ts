import './index.css';
import { NaiveDOM } from '@/lib/core/framework';
import { createCounterDisplay } from '@/components/native/counter-display';
import { createReactBridge } from '@/bridges/react-bridge';
import { createVueBridge } from '@/bridges/vue-bridge';
import { ShadcnButton } from '@/components/react/shadcn-button';
import PrimevueButton from '@/components/vue/primevue-button.vue';
import VueCounterDisplay from '@/components/vue/counter-display.vue';
import { ShadcnInput } from '@/components/react/shadcn-input';
import {ShadcnDialog} from "@/components/react/shadcn-dialog.tsx";

const app = new NaiveDOM(document.getElementById('app')!);

app.register('CounterDisplay', () => createCounterDisplay());

const reactBridge = createReactBridge(app);
reactBridge.register('ShadcnButton', ShadcnButton);

const vueBridge = createVueBridge(app);
vueBridge.register('PrimevueButton', PrimevueButton);

vueBridge.register('VueCounterDisplay', VueCounterDisplay);

reactBridge.register('ShadcnInput', ShadcnInput);

reactBridge.register('ShadcnDialog', ShadcnDialog);

app.render('VueCounterDisplay', {}, document.getElementById('counter-slot')!);
app.render('ShadcnDialog', {}, document.getElementById('dialog-slot')!);
app.render('ShadcnButton', { label: 'Нажми меня' }, document.getElementById('react-slot')!);
app.render('PrimevueButton', { label: 'Нажми меня' }, document.getElementById('vue-slot')!);
app.render('ShadcnInput', { placeholder: 'Введите и нажмите Enter' }, document.getElementById('input-slot')!);