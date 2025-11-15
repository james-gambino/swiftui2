import { VueInReact } from '@/bridges/VueInReact';
import { defineComponent } from 'vue';
import ReactInVue from '@/bridges/ReactInVue.vue';
import React from "react";

export function createVuePortal(
    Component: ReturnType<typeof defineComponent>,
    props?: Record<string, unknown>
) {
    return React.createElement(VueInReact, { component: Component, props });
}

export function createReactPortal(
    Component: React.ComponentType<any>,
    props?: Record<string, unknown>
) {
    return {
        component: ReactInVue,
        props: { component: Component, props }
    };
}