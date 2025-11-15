import type { ComponentProps as ReactComponentProps } from 'react';
import type { ExtractPropTypes } from 'vue';

export type VueComponentProps<T> = T extends ReturnType<typeof defineComponent<infer P>>
    ? ExtractPropTypes<P>
    : never;

export type FrameworkPortalProps<
    TFramework extends 'react' | 'vue',
    TComponent
> = TFramework extends 'react'
    ? { component: React.ComponentType<TComponent>; props?: ReactComponentProps<TComponent> }
    : { component: ReturnType<typeof defineComponent>; props?: VueComponentProps<TComponent> };

// Пример использования
import type { VueButton } from '@/components/vue/VueButton.vue';
type VueButtonProps = VueComponentProps<typeof VueButton>; // Выведены автоматически!