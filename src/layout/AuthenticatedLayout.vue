<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const { shouldDisplayNav = true } = defineProps({ shouldDisplayNav: Boolean });

const router = useRouter();
const isProcessing = ref(false);

async function ensureAuthenticated() {
  await axios
    .get("http://api.find-roommate.test/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {})
    .catch((error) => {
      if (error.response) {
        if (error.response.status == 401) {
          router.push("/login");
        } else {
          errorMessage.value = "Server tidak dapat dihubungi, coba lagi nanti";
          errorDialog.value.visible = true;
          router.push("/");
        }
      }
      console.log(error);
    });
}

onMounted(async () => {
  isProcessing.value = true;
  await ensureAuthenticated();
  isProcessing.value = false;
});
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
