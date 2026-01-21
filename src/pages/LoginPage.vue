<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const isProcessing = ref(false);

let phone = ref("");
let password = ref("");

let errorDialog = ref();
let errorMessage = ref();

async function login() {
  isProcessing.value = true;

  let formData = new FormData();
  formData.append("phone", phone.value);
  formData.append("password", password.value);

  await axios
    .get("http://api.find-roommate.test/sanctum/csrf-cookie", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      axios
        .postForm("http://api.find-roommate.test/login", formData, {
          withCredentials: true,
          withXSRFToken: true,
        })
        .then((response) => {
          router.push("/find-roommate");
        })
        .catch((e) => {
          console.log(e);

          if (e.response.status == 422) {
            errors.value = e.response.data.errors;
            validationErrorDialog.value.visible = true;
          } else if (e.response.status == 401) {
            errorMessage.value("Your phone or password is wrong");
            errorDialog.value.visible = true;
          } else {
            errorMessage.value("Something is wrong, please try again later");
            errorDialog.value.visible = true;
          }
        });
    });

  isProcessing.value = false;
}

const validationErrorDialog = ref();
const errors = ref(null);

async function redirectIfLoggedIn() {
  await axios
    .get("http://api.find-roommate.test/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      router.push("/find-roommate");
    })
    .catch((error) => {});
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
            <label for="phone">Phone</label>
            <InputText
              id="phone"
              type="tel"
              placeholder="0812-9087-1029"
              v-model="phone"
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

  <ValidationErrorDialog ref="validationErrorDialog" :errors="errors" />

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
