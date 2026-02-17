<script setup>
import { ref } from 'vue';

let visible = ref(false);

defineExpose({ visible });
</script>

<template>
  <Dialog :visible="visible" modal :closable="false">
    <ProgressSpinner />
  </Dialog>
</template>
