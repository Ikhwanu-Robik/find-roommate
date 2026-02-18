<script setup>
import { ref } from "vue";
import { supabase } from "../../utils/supabase";

const isProcessing = ref(false);
const errorDialog = ref();
const errorMessage = ref();
const infoDialog = ref();
const infoMessage = ref();

let email = ref("");
let password = ref("");

const signup = async () => {
  isProcessing.value = true;

  if (
    !password.value ||
    !email.value
  ) {
    errorMessage.value = "Semua kolom harus diisi";
    errorDialog.value.visible = true;
    isProcessing.value = false;
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    infoMessage.value =
      "Periksa email dari Supabase Auth untuk menyelesaikan Signup. Halaman ini boleh ditutup.";
    infoDialog.value.visible = true;
  } catch (error) {
    errorMessage.value = error;
    errorDialog.value.visible = true;
  }
  isProcessing.value = false;
};
</script>

<template>
  <div class="signup-page">
    <Card class="signup-card">
      <template #title>
        <div class="header">
          <h4 class="subtitle">Signup</h4>
          <h1 class="brand">BagiSewa</h1>
        </div>
      </template>

      <template #content>
        <form class="form" @submit.prevent="signup">
          <div class="field">
            <label for="email">Email</label>
            <InputText
              id="email"
              type="email"
              placeholder="email"
              v-model="email"
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="password">Password</label>
            <Password
              id="password"
              v-model="password"
              toggleMask
              :feedback="false"
              placeholder="password"
              class="w-full"
            />
          </div>
          <Button label="Signup" type="submit" class="w-full mt-3" />
        </form>
      </template>
    </Card>
  </div>

  <LoadingDialog :visible="isProcessing" />
  <ErrorDialog ref="errorDialog" :message="errorMessage" />
  <InfoDialog ref="infoDialog" :message="infoMessage" />
</template>

<style scoped>
.signup-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--surface-ground);
}

.signup-card {
  width: 100%;
  max-width: 420px;
}

.header {
  text-align: center;
}

.subtitle {
  margin: 0;
  font-weight: 500;
  color: var(--text-color-secondary);
}

.brand {
  margin: 0;
  font-size: 1.8rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}

.photo-preview {
  margin-top: 0.5rem;
  width: 100%;
  max-width: 200px;
  border-radius: 0.75rem;
}
</style>
