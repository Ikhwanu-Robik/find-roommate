<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { formatDate } from "../utils.js";

const router = useRouter();
const isProcessing = ref(false);

let full_name = ref("");

let profile_photo = ref("");
let profile_photo_path = ref("");

let phone = ref("");
let password = ref("");
let gender = ref("male");
let birthdate = ref("");
let address = ref("");
let bio = ref("");

const genders = [
  { label: "Cowo", value: "male" },
  { label: "Cewe", value: "female" },
];

function handleFileSelection(event) {
  const file = event.files[0];
  profile_photo.value = file;
  profile_photo_path.value = URL.createObjectURL(file);
}

let validationErrorDialog = ref();
let errors = ref();

let errorDialog = ref();
let errorMessage = ref();

async function signup() {
  isProcessing.value = true;

  let formData = new FormData();
  formData.append("name", full_name.value);
  formData.append("profile_photo", profile_photo.value);
  formData.append("phone", phone.value);
  formData.append("password", password.value);
  formData.append("gender", gender.value);
  if (birthdate.value != "") {
    formData.append("birthdate", formatDate(birthdate.value));
  }
  formData.append("address", address.value);
  formData.append("bio", bio.value);

  await axios
    .postForm("http://api.find-roommate.test/api/signup", formData, {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      errorMessage.value =
        "Sorry, there' no error. Your signup was successful. I just don't wanna modify the text.";
      errorDialog.value.visible = true;
      router.push("/login");
    })
    .catch((e) => {
      console.log(e);
      if (e.response.status == 422) {
        errors.value = e.response.data.errors;
        validationErrorDialog.value.visible = true;
      } else {
        errorMessage.value = "Something is wrong, please try again later";
        errorDialog.value.visible = true;
      }
    });

  isProcessing.value = false;
}

async function redirectIfLoggedIn() {
  await axios
    .get("http://api.find-roommate.test/api/me", {
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
            <label for="full_name">Full Name</label>
            <InputText
              id="full_name"
              placeholder="Ahmad Kasim"
              v-model="full_name"
              class="w-full"
            />
          </div>

          <div class="field">
            <label>Foto Profil</label>
            <FileUpload
              mode="basic"
              accept="image/*"
              chooseLabel="Pilih Foto"
              customUpload
              @select="handleFileSelection"
              class="w-full"
            />

            <img
              v-if="profile_photo_path"
              :src="profile_photo_path"
              alt="Preview Foto Profil"
              class="photo-preview"
            />
          </div>

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
              placeholder="Password"
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="gender">Gender</label>
            <Select
              id="gender"
              v-model="gender"
              :options="genders"
              optionLabel="label"
              optionValue="value"
              placeholder="Pilih gender"
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="birthdate">Ulang Tahun</label>
            <DatePicker
              id="birthdate"
              v-model="birthdate"
              dateFormat="yy-mm-dd"
              showIcon
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="address">Alamat</label>
            <InputText
              id="address"
              placeholder="Jakarta"
              v-model="address"
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="bio">Bio</label>
            <Textarea
              id="bio"
              v-model="bio"
              rows="4"
              placeholder="Tell me about yourself"
              class="w-full"
            />
          </div>

          <Button label="Signup" type="submit" class="w-full mt-3" />
        </form>
      </template>
    </Card>
  </div>

  <ValidationErrorDialog ref="validationErrorDialog" :errors="errors" />

  <ErrorDialog ref="errorDialog" :message="errorMessage" />
  <LoadingDialog :visible="isProcessing" />
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
