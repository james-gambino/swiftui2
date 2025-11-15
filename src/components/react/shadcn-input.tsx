import React, { useState, useEffect } from 'react';
import { Input as ShadcnInputComponent } from '@/components/ui/input';
import { globalState } from '@/lib/core/state';

const InputWrapper: React.FC<React.ComponentProps<typeof ShadcnInputComponent>> = (props) => {
    return <ShadcnInputComponent {...props} />;
};

export const ShadcnInput: React.FC<{ placeholder?: string }> = ({ placeholder = 'Введите число для инкремента' }) => {
    const [inputValue, setInputValue] = useState(globalState.getState().count.toString());

    useEffect(() => {
        const unsubscribe = globalState.subscribe((state) => {
            setInputValue(state.count.toString()); // Обновляем input при изменении счётчика
        });
        return unsubscribe;
    }, []);

    const handleIncrement = () => {
        const incrementValue = parseInt(inputValue, 10) || 1;
        for (let i = 0; i < incrementValue; i++) {
            globalState.increment();
        }
    };

    return (
        <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded">
            <div className="flex gap-2 items-center">
                <InputWrapper
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setInputValue(e.target.value);
                    }}
                    placeholder={placeholder}
                />
                <button
                    onClick={handleIncrement}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
                >
                    Инкремент +{inputValue || 1}
                </button>
            </div>
        </div>
    );
};