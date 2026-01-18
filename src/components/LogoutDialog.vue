<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const visible = ref(false);
const router = useRouter();

const confirmLogout = async () => {
  await axios.post(
    "http://api.find-roommate.test/logout",
    {},
    {
      withCredentials: true,
      withXSRFToken: true,
    }
  );

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
