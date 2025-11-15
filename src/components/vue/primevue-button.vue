<template>
  <Button
      @click="globalState.increment()"
      :label="label"
      icon="pi pi-plus"
      class="p-button-success"
  />
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import {globalState} from "@/lib/core/state.ts";

defineProps<{
  label: string
}>();
</script>