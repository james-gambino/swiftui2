<!-- src/bridges/ReactInVue.vue -->
<template>
  <div ref="reactContainer" class="react-portal-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { createRoot, type Root } from 'react-dom/client';
import { createElement } from 'react'; // ← Импортируем createElement
import type { ComponentType } from 'react';

interface Props {
  component: ComponentType<any>;
  props?: Record<string, unknown>;
}

const props = defineProps<Props>();
const reactContainer = ref<HTMLDivElement>();
const rootRef = ref<Root>();

onMounted(() => {
  if (!reactContainer.value) return;

  rootRef.value = createRoot(reactContainer.value);

  // Используем createElement вместо JSX
  const reactElement = createElement(props.component, props.props || {});
  rootRef.value.render(reactElement);
});

// Обновление при изменении props
watch(() => props.props, (newProps) => {
  if (rootRef.value && reactContainer.value) {
    const reactElement = createElement(props.component, newProps || {});
    rootRef.value.render(reactElement);
  }
}, { deep: true });

onUnmounted(() => {
  rootRef.value?.unmount();
});
</script>


<!--<template>-->
<!--  <ReactInVue-->
<!--      :component="ShadcnButton"-->
<!--      :props="{ -->
<!--      label: 'Кликни меня',-->
<!--      onClick: handleClick // ← Передаём обработчики напрямую в props-->
<!--    }"-->
<!--  />-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ShadcnButton } from '@/components/react/shadcn-button';-->

<!--const handleClick = () => {-->
<!--  console.log('Клик из Vue!');-->
<!--};-->
<!--</script>-->