<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoadingDialog from "./LoadingDialog.vue";

const visible = ref(false);
const router = useRouter();
const isProcessing = ref();

const confirmLogout = async () => {
  isProcessing.value = true;

  await axios.post(
    import.meta.env.VITE_API_BASE_URL + "/logout",
    {},
    {
      withCredentials: true,
      withXSRFToken: true,
    }
  );

  isProcessing.value = false;
  visible.value = false;
  router.push("/");
};

defineExpose({
  visible,
});
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Logout?"
    :closable="false"
    class="logout-dialog"
  >
    <p class="description">
      Kamu akan diarahkan ke landing page setelah logout.
    </p>

    <div class="actions">
      <Button label="No" text @click="visible = false" />
      <Button label="Yes" severity="danger" @click="confirmLogout" />
    </div>
  </Dialog>

  <LoadingDialog :visible="isProcessing" />
</template>

<style scoped>
.logout-dialog {
  width: 90vw;
  max-width: 360px;
}

.description {
  margin: 0.5rem 0 1rem;
  font-size: 0.95rem;
  color: var(--text-color-secondary);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
