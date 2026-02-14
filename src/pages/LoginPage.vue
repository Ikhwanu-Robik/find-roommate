<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const isProcessing = ref(false);

const errorDialog = ref();
const errorMessage = ref();

const validationErrors = ref(null);
const validationErrorDialog = ref();

const phone = ref("");
const password = ref("");

async function login() {
  isProcessing.value = true;

  let formData = prepareFormData();
  if (formData) {
    await getCsrfCookie();

    try {
      await sendLoginRequest(formData);
      router.push("/find-roommate");
    } catch (e) {
      console.log(e);
      handleFailedLogin(e);
    }
  }

  isProcessing.value = false;
}

function prepareFormData() {
  if (!phone.value || !password.value) {
    errorMessage.value = "Semua kolom harus diisi";
    errorDialog.value.visible = true;

    return false;
  }
  let regexp = /^08[1-9]{1}\d{1}-{1}\d{4}-\d{2,5}$/;
  if (!regexp.test(phone.value)) {
    errorMessage.value = "No telepon harus berformat 08xx-xxxx-xxxxx";
    errorDialog.value.visible = true;

    return false;
  }

  let formData = new FormData();
  formData.append("phone", phone.value);
  formData.append("password", password.value);

  return formData;
}

async function getCsrfCookie() {
  try {
    await axios.get(
      import.meta.env.VITE_API_BASE_URL + "/sanctum/csrf-cookie",
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    );
  } catch (e) {
    console.log(e);

    errorMessage.value = "Terjadi kesalahan, coba lagi nanti";
    errorDialog.value.visible = true;
  }
}

async function sendLoginRequest(formData) {
  await axios.postForm(import.meta.env.VITE_API_BASE_URL + "/login", formData, {
    withCredentials: true,
    withXSRFToken: true,
  });
}

function handleFailedLogin(err) {
  if (err.response.status == 422) {
    validationErrors.value = err.response.data.errors;
    validationErrorDialog.value.visible = true;
  } else if (err.response.status == 401) {
    errorMessage.value = "No telepon atau passwordmu salah";
    errorDialog.value.visible = true;
  } else {
    errorMessage.value = "Terjadi kesalahan, coba lagi nanti";
    errorDialog.value.visible = true;
  }
}

async function handleGoogleSigninSuccess(response) {
  isProcessing.value = true;

  const { credential } = response;

  await axios
    .post(
      import.meta.env.VITE_API_BASE_URL + "/api/auth/google",
      {
        credential: credential,
      },
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    )
    .then(async (response) => {
      router.push("/find-roommate");
    })
    .catch((e) => {
      console.log(e);

      if (e.response.status == 422) {
        validationErrors.value = e.response.data.errors;
        validationErrorDialog.value.visible = true;
      } else {
        errorMessage.value = "Terjadi kesalahan, coba lagi nanti";
        errorDialog.value.visible = true;
      }
    });

  isProcessing.value = false;
}

function handleGoogleSigninError() {
  errorMessage.value = "Google Sign-in error, coba lagi nanti";
  errorDialog.value.visible = true;
}

function enforcePhoneNumberFormat(e) {
  let value = e.target.value.replace(/\D/g, "");
  let formatted = "";

  if (value.length > 0) {
    formatted += value.substring(0, 4);
  }
  if (value.length > 4) {
    formatted += "-" + value.substring(4, 8);
  }
  if (value.length > 8) {
    formatted += "-" + value.substring(8, 13);
  }

  phone.value = formatted;
}

async function redirectIfLoggedIn() {
  try {
    await axios.get(import.meta.env.VITE_API_BASE_URL + "/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    });
    router.push("/find-roommate");
  } catch (e) {
    // can't get self's data = not logged in
  }
}

onMounted(async () => {
  isProcessing.value = true;
  await redirectIfLoggedIn();
  isProcessing.value = false;
});
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
            <label for="phone">Telepon</label>
            <InputText
              id="phone"
              type="tel"
              placeholder="telepon"
              v-model="phone"
              maxlength="15"
              @input="enforcePhoneNumberFormat"
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

        <GoogleSignInButton
          @success="handleGoogleSigninSuccess"
          @error="handleGoogleSigninError"
        >
        </GoogleSignInButton>

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
