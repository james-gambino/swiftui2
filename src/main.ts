import './index.css';
import { naiveDOM } from '@/lib/core/framework';
import { ShadcnButton } from '@/components/react/shadcn-button';
import PrimevueButton from '@/components/vue/primevue-button.vue';
import VueCounterDisplay from '@/components/vue/counter-display.vue';
import { ShadcnInput } from '@/components/react/shadcn-input';
import { ShadcnDialog } from '@/components/react/shadcn-dialog';
import DataGrid from "@/components/vue/DataGrid.vue";
import 'devextreme/dist/css/dx.material.blue.light.css';

const sampleData = {
    dataSource: [
        { id: 1, name: 'Laptop', price: 999.99, inStock: true },
        { id: 2, name: 'Mouse', price: 29.99, inStock: true },
        { id: 3, name: 'Keyboard', price: 79.99, inStock: false },
        { id: 4, name: 'Monitor', price: 349.99, inStock: true },
        { id: 5, name: 'Webcam', price: 89.99, inStock: true }
    ],
    columns: [
        { dataField: 'id', caption: 'ID', width: 80, sortOrder: 'asc' },
        { dataField: 'name', caption: 'Product Name', sortOrder: 'asc' },
        { dataField: 'price', caption: 'Price', format: 'currency', sortOrder: 'asc' },
        { dataField: 'inStock', caption: 'In Stock', dataType: 'boolean' }
    ]
};

naiveDOM.registerReact('ShadcnButton', ShadcnButton);
naiveDOM.registerReact('ShadcnInput', ShadcnInput);
naiveDOM.registerReact('ShadcnDialog', ShadcnDialog);
naiveDOM.registerVue('PrimevueButton', PrimevueButton);
naiveDOM.registerVue('DataGrid', DataGrid);
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
safeMount('DataGrid', 'dx-grid-slot', sampleData);