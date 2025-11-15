<template>
  <div class="counter-display p-4 bg-gray-100 rounded mb-4">
    <span>Общий счетчик: </span>
    <strong class="text-2xl text-blue-600">{{ count }}</strong>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import {globalState} from "@/lib/core/state.ts";

const count = ref(globalState.getState().count);

const unsubscribe = globalState.subscribe((state) => {
  count.value = state.count;
});

onUnmounted(() => {
  unsubscribe();
});
</script>