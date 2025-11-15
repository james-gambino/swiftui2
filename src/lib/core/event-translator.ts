// Vue -> React (v-on:click -> onClick)
export function vueEventToReact(eventName: string): string {
    return `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;
}

// React -> Vue (onClick -> emit('click'))
export function reactEventToVue(handler: Function): (...args: any[]) => void {
    return (...args) => handler(...args);
}


// class VueBridge implements ComponentRenderer {
//     render(instance: VNode, target: HTMLElement) {
//         // Поглощаем Vue-эмиты и пробрасываем наружу
//         instance.props = {
//             ...instance.props,
//             onVnodeMounted: (vnode) => {
//                 // Пробрасываем кастомные эвенты через CustomEvent
//                 vnode.component?.emit('react:update', vnode.props);
//             }
//         };
//     }
// }

// React получает ref на Vue-компонент
// const vueRef = useRef<HTMLDivElement>(null);
//
// useEffect(() => {
//     if (vueRef.current) {
//         // Получаем Vue-инстанс через WeakMap
//         const vueInstance = naiveDOM.getInstance(vueRef.current);
//         vueInstance?.proxy?.$emit('react:ready');
//     }
// }, []);

// <!-- Vue получает ref на React-компонент -->
// <react-in-vue
// :component="ReactInput"
// :props="{ inputRef: reactRef }"
//     />