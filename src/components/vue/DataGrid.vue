<template>
  <div>DataGrid</div>
  <DxDataGrid
      :data-source="dataSource"
      :columns="columns"
      :show-borders="true"
  >
    <DxPaging :enabled="true" :page-size="10" />
    <DxFilterRow :visible="true" />
  </DxDataGrid>
</template>

<script setup lang="ts">
import { DxDataGrid, DxPaging, DxFilterRow } from 'devextreme-vue/data-grid';
import type { PropType } from 'vue';

defineProps({
  dataSource: {
    type: Array as PropType<any[]>,
    required: true,
    description: 'Массив данных для отображения'
  },
  columns: {
    type: Array as PropType<any[]>,
    required: true,
    description: 'Настройка столбцов'
  }
});

// const gridProps = computed(() => ({
//   ...props
// }));
</script>

<style>

</style>