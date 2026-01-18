<script setup>
import { ref } from "vue";

const visible = ref(false);

defineProps(["errors"]);

defineExpose({
  visible,
});
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Input Salah!">
    <ul>
      <li v-for="(messages, error) in errors" :key="error">
        {{ error }}
        <ul>
          <li v-for="message in messages" :key="message">
            {{ message }}
          </li>
        </ul>
      </li>
    </ul>
  </Dialog>
</template>
