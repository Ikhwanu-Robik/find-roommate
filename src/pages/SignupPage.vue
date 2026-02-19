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
          <h1 class="brand">Aligned Living</h1>
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
/* =========================
   Signup Page Layout
========================= */

.signup-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--surface-ground);
  padding: 2rem;
}

/* =========================
   Card Styling
========================= */

.signup-card {
  width: 100%;
  max-width: 420px;
  border-radius: 12px;
}

/* soften PrimeVue card slightly */
.signup-card .p-card-title {
  padding-bottom: 0;
}

.signup-card .p-card-content {
  padding-top: 1rem;
}

/* =========================
   Header Section
========================= */

.header {
  text-align: center;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-color-secondary);
  margin: 0;
}

.brand {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0.25rem 0 0 0;
  letter-spacing: -0.3px;
}

/* =========================
   Form
========================= */

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-color);
}

/* =========================
   Input Refinement (Non-destructive)
========================= */

.p-inputtext,
.p-password input {
  border-radius: 8px;
}

/* subtle focus refinement */
.p-inputtext:focus,
.p-password input:focus {
  box-shadow: 0 0 0 2px var(--primary-color)20;
}

/* =========================
   Button
========================= */

.p-button {
  border-radius: 8px;
  font-weight: 500;
}

.p-button:hover {
  transform: translateY(-1px);
  transition: transform 0.15s ease;
}

/* =========================
   Optional subtle footer text (if you add it later)
========================= */

.signup-helper {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: var(--text-color-secondary);
}

.signup-helper a {
  color: var(--primary-color);
}
</style>
