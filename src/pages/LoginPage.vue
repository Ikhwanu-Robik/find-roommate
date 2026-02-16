<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../../utils/supabase";

const router = useRouter();
const isProcessing = ref(false);
const errorDialog = ref();
const errorMessage = ref();

const email = ref("");
const password = ref("");

async function login() {
  isProcessing.value = true;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;
  } catch (error) {
    errorMessage.value = error;
    errorDialog.value.visible = true;
  }

  try {
    const { data } = await supabase.from("profiles").select("*");

    if (data) {
      router.push("/find-roommate");
    } else {
      router.push("/create-profile");
    }
  } catch (error) {
    errorMessage.value = error;
    errorDialog.value.visible = true;
  }

  isProcessing.value = false;
}
</script>

<template>
  <div class="login-page">
    <Card class="login-card">
      <template #title>
        <div class="header">
          <h4 class="subtitle">Login</h4>
          <h1 class="brand">BagiSewa</h1>
        </div>
      </template>

      <template #content>
        <form class="form" @submit.prevent="login">
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

          <Button label="Login" type="submit" class="w-full mt-3" />
        </form>

        <div class="footer">
          <RouterLink to="/signup" class="signup-link">
            atau signup
          </RouterLink>
        </div>
      </template>
    </Card>
  </div>

  <ValidationErrorDialog
    ref="validationErrorDialog"
    :errors="validationErrors"
  />

  <ErrorDialog ref="errorDialog" :message="errorMessage" />
  <LoadingDialog :visible="isProcessing" />
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--surface-ground);
}

.login-card {
  width: 100%;
  max-width: 360px;
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

.footer {
  margin-top: 1rem;
  text-align: center;
}

.signup-link {
  font-size: 0.875rem;
  color: var(--primary-color);
  text-decoration: none;
}
</style>
