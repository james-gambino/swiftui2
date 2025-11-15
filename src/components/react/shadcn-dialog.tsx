import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { globalState } from '@/lib/core/state';
import {Button} from "@/lib/ui/button.tsx";
import {createVuePortal} from "@/bridges/FrameworkPortal.ts";
import PrimevueButton from "@/components/vue/primevue-button.vue";
import DataGrid from "@/components/vue/DataGrid.vue";

export const ShadcnDialog: React.FC = () => {
    const [count, setCount] = useState(globalState.getState().count);

    const sampleData = {
        dataSource: [
            { id: 1, name: 'Laptop', price: 999.99, inStock: true },
            { id: 2, name: 'Mouse', price: 29.99, inStock: true },
            { id: 5, name: 'Webcam', price: 89.99, inStock: true }
        ],
        columns: [
            { dataField: 'id', caption: 'ID', width: 80, sortOrder: 'asc' },
            { dataField: 'price', caption: 'Price', format: 'currency', sortOrder: 'asc' },
            { dataField: 'inStock', caption: 'In Stock', dataType: 'boolean' }
        ]
    };

    useEffect(() => {
        const unsubscribe = globalState.subscribe((state) => {
            setCount(state.count);
        });
        return unsubscribe;
    }, []);

    const vueButton = createVuePortal(PrimevueButton, {
        onIncrement: () => globalState.setCount(count + 1)
    });

    const dataGrid = createVuePortal(DataGrid, sampleData);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Открыть счётчик</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Текущее значение</DialogTitle>
                    <DialogDescription>
                        Счётчик: <strong className="text-2xl text-blue-600">{count}</strong>
                    </DialogDescription>

                    <div className="mt-4">
                        {vueButton}
                    </div>
                    <div className="mt-4">
                        {dataGrid}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};