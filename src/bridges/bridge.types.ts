import type {ComponentType, ReactNode} from 'react';
import type { Component as VueComponentType } from 'vue';

export type CleanupFunction = () => void;
export type ReactComponent = ComponentType<any>;
export type VueComponent = VueComponentType;

//  интерфейс реализуют объекты в NaiveDOM.register(), а не сами бриджи
export interface ComponentRenderer {
    mount(target: HTMLElement, props?: ReactProps): CleanupFunction;
}

export interface CrossFrameworkBridge {
    renderInReact(vueComponent: VueComponent, target: HTMLElement, props?: Record<string, unknown>): CleanupFunction;
    renderInVue(reactComponent: ReactComponent, target: HTMLElement, props?: Record<string, unknown>): CleanupFunction;
}

export type ReactProps = Record<string, unknown> & {
    key?: string | number | null;
    ref?: unknown;
    children?: ReactNode;
};