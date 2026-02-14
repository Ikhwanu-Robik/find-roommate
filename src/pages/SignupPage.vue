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

let name = ref("");
let phone = ref("");
let password = ref("");

async function signup() {
  isProcessing.value = true;

  if (!name.value || !phone.value || !password.value) {
    errorMessage.value = "Semua kolom harus diisi";
    errorDialog.value.visible = true;

    isProcessing.value = false;
    return;
  }
  let regexp = /^08[1-9]{1}\d{1}-{1}\d{4}-\d{2,5}$/;
  if (!regexp.test(phone.value)) {
    errorMessage.value = "No telepon harus berformat 08xx-xxxx-xxxxx";
    errorDialog.value.visible = true;

    isProcessing.value = false;
    return;
  }

  await axios
    .post(
      import.meta.env.VITE_API_BASE_URL + "/api/v2/signup",
      {
        name: name.value,
        phone: phone.value,
        password: password.value,
      },
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    )
    .then(async (response) => {
      await axios
        .postForm(
          import.meta.env.VITE_API_BASE_URL + "/login",
          {
            phone: phone.value,
            password: password.value,
          },
          {
            withCredentials: true,
            withXSRFToken: true,
          }
        )
        .then((response) => {
          router.push("/create-profile");
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
      router.push("/create-profile");
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
  await axios
    .get(import.meta.env.VITE_API_BASE_URL + "/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      router.push("/find-roommate");
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(async () => {
  isProcessing.value = true;
  await redirectIfLoggedIn();
  isProcessing.value = false;
});
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
            <label for="name">Username</label>
            <InputText
              id="name"
              placeholder="username"
              v-model="name"
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="phone">Telepon</label>
            <InputText
              id="phone"
              type="tel"
              placeholder="telepon"
              v-model="phone"
              class="w-full"
              maxlength="15"
              @input="enforcePhoneNumberFormat"
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
        <GoogleSignInButton
          @success="handleGoogleSigninSuccess"
          @error="handleGoogleSigninError"
        >
        </GoogleSignInButton>
      </template>
    </Card>
  </div>

  <ValidationErrorDialog
    ref="validationErrorDialog"
    :errors="validationErrors"
  />
  <LoadingDialog :visible="isProcessing" />
  <ErrorDialog ref="errorDialog" :message="errorMessage" />
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
