<script setup>
const { shouldDisplayNav = true } = defineProps({ shouldDisplayNav: Boolean });
</script>

<template>
  <div class="page">
    <slot></slot>
    <NavigationBar v-if="shouldDisplayNav" />
  </div>

  <ErrorDialog ref="errorDialog" :message="errorMessage" />
  <LoadingDialog :visible="isProcessing" />
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--surface-ground);
  display: flex;
  flex-direction: column;
}
</style>
