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

export const ShadcnDialog: React.FC = () => {
    const [count, setCount] = useState(globalState.getState().count);

    useEffect(() => {
        const unsubscribe = globalState.subscribe((state) => {
            setCount(state.count);
        });
        return unsubscribe;
    }, []);

    const vueButton = createVuePortal(PrimevueButton, {
        onIncrement: () => globalState.setCount(count + 1)
    });

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
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};