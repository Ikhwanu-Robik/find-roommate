<script setup>
import { formatDate } from "@/utils";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const errorDialog = ref();
const errorMessage = ref();
const validationErrors = ref(null);
const validationErrorDialog = ref();
const isProcessing = ref(false);

const self = ref();

let full_name = ref("");
let profile_photo = ref("");
let profile_photo_path = ref("");
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

async function createProfile() {
  isProcessing.value = true;

  let formData = new FormData();
  formData.append("full_name", full_name.value);
  formData.append("gender", gender.value);
  if (birthdate.value != "") {
    formData.append("birthdate", formatDate(birthdate.value));
  }
  formData.append("address", address.value);
  formData.append("bio", bio.value);
  formData.append("profile_photo", profile_photo.value);

  await axios
    .postForm(
      "http://api.find-roommate.test/api/v2/users/" +
        self.value.id +
        "/profiles",
      formData,
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    )
    .then((response) => {
      router.push("/try-find-roommate");
    })
    .catch((e) => {
      console.log(e);
      if (e.response.status == 422) {
        validationErrors.value = e.response.data.errors;
        validationErrorDialog.value.visible = true;
      } else {
        errorMessage.value = "Something is wrong, please try again later";
        errorDialog.value.visible = true;
      }
    });

  isProcessing.value = false;
}

async function getSelf() {
  await axios
    .get("http://api.find-roommate.test/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      self.value = response.data.user;
    })
    .catch((error) => {
      errorMessage.value = "Gagal mendapatkan data dirimu, coba lagi nanti";
      errorDialog.value.visible = true;

      console.log(error);
    });
}

onMounted(async () => {
  isProcessing.value = true;
  await getSelf();
  isProcessing.value = false;
});
</script>

<template>
  <div class="signup-page">
    <Card class="signup-card">
      <template #title>
        <div class="header">
          <h4 class="subtitle">Mari langung cari teman! Pertama-tama</h4>
          <h1 class="brand">Lengkapi Profile-mu</h1>
        </div>
      </template>

      <template #content>
        <form class="form" @submit.prevent="createProfile">
          <div class="field">
            <label for="full_name">Full Name</label>
            <InputText id="full_name" v-model="full_name" class="w-full">
            </InputText>
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

          <Button label="Create Profile" type="submit" class="w-full mt-3" />
        </form>
      </template>
    </Card>
  </div>

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
