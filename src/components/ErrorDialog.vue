<script setup>
import { ref } from "vue";

const visible = ref(false);

defineProps(["message"]);

defineExpose({
  visible,
});
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Error!">
    <p>{{ message }}</p>
  </Dialog>
</template>
