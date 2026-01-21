<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isProcessing = ref(false);

const isHavingUnsavedChange = ref(false);

const profile_photo = ref(null);
const profile_photo_path = ref(null);

const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const markUnsaved = () => {
  isHavingUnsavedChange.value = true;
};

const handleFileSelection = (event) => {
  const file = event.files[0];
  profile_photo.value = file;
  profile_photo_path.value = URL.createObjectURL(file);
  markUnsaved();
};

let errors = ref();
let validationErrorDialog = ref();

let errorDialog = ref();
let errorMessage = ref();

function updateProfile() {
  isProcessing.value = true;

  let formData = new FormData();
  formData.append("full_name", profile.value.full_name);
  formData.append("gender", profile.value.gender);
  if (profile.value.birthdate instanceof Date) {
    formData.append("birthdate", formatDate(profile.value.birthdate));
  }
  formData.append("address", profile.value.address);
  formData.append("bio", profile.value.bio);
  if (profile_photo.value != null) {
    formData.append("profile_photo", profile_photo.value);
  }
  // because our backend use PHP which doesn't
  // support sending data through PUT
  formData.append("_method", "PUT");

  axios
    .post(
      "http://api.find-roommate.test/api/profiles/" + profile.value.id,
      formData,
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    )
    .then((response) => {
      isProcessing.value = false;
      isHavingUnsavedChange.value = false;
    })
    .catch((error) => {
      errorMessage.value = "Can't save changes, please try again later";
      errorDialog.value.visible = true;
      if (error.response) {
        if (error.response.status == 422) {
          errors.value = error.response.data.errors;
          validationErrorDialog.value.visible = true;
        }
      }
      console.log(error);
    });
}

function formatDate(date) {
  let yyyy = date.getFullYear();
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

let profile = ref(null);

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
          errorMessage.value("Server tidak dapat dihubungi, coba lagi nanti");
          errorDialog.value.visible = true;
          router.push("/");
        }
      }
      console.log(error);
    });
}

async function getSelfAndDisplay() {
  await axios
    .get("http://api.find-roommate.test/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      profile.value = response.data.user.profile;
      profile_photo_path.value =
        "http://api.find-roommate.test/storage/" + profile.value.profile_photo;
    })
    .catch((error) => {
      errorMessage.value("Gagal mendapatkan data dirimu, coba lagi nanti");
      errorDialog.value.visible = true;

      console.log(error);
    });
}

onMounted(async () => {
  isProcessing.value = true;
  await ensureAuthenticated();
  await getSelfAndDisplay();
  isProcessing.value = false;
});
</script>

<template>
  <div class="profile-page">
    <!-- Header -->
    <header class="page-header">
      <h1>Profil</h1>
      <Tag
        v-if="isHavingUnsavedChange"
        severity="warn"
        value="Perubahan belum disimpan"
      />
    </header>

    <!-- Content -->
    <main class="content">
      <Card>
        <template #content v-if="profile">
          <!-- Profile Photo -->
          <div class="photo-section">
            <img
              :src="profile_photo_path"
              alt="Profile Photo"
              class="profile-photo"
            />

            <FileUpload
              mode="basic"
              accept="image/*"
              chooseLabel="Ganti Foto Profil"
              customUpload
              @select="handleFileSelection"
            />
          </div>

          <!-- Form -->
          <div class="form">
            <div class="field">
              <label>Full Name</label>
              <InputText
                v-model="profile.full_name"
                class="w-full"
                @input="markUnsaved"
              />
            </div>

            <div class="field">
              <label>Gender</label>
              <Select
                v-model="profile.gender"
                :options="genders"
                optionLabel="label"
                optionValue="value"
                placeholder="Pilih gender"
                class="w-full"
                @change="markUnsaved"
              />
            </div>

            <div class="field">
              <label>Birthdate</label>
              <DatePicker
                v-model="profile.birthdate"
                dateFormat="yy-mm-dd"
                showIcon
                class="w-full"
                @update:modelValue="markUnsaved"
              />
            </div>

            <div class="field">
              <label>Address</label>
              <InputText
                v-model="profile.address"
                class="w-full"
                @input="markUnsaved"
              />
            </div>

            <div class="field">
              <label>Bio</label>
              <Textarea
                v-model="profile.bio"
                rows="4"
                class="w-full"
                @input="markUnsaved"
              />
            </div>
          </div>
        </template>
      </Card>
    </main>

    <!-- Sticky Actions -->
    <footer class="actions">
      <Button
        label="Save"
        icon="pi pi-save"
        class="w-full"
        :disabled="!isHavingUnsavedChange"
        @click="updateProfile"
      />
    </footer>

    <NavigationBar />

    <ValidationErrorDialog ref="validationErrorDialog" :errors="errors" />

    <ErrorDialog ref="errorDialog" :message="errorMessage" />

    <LoadingDialog :visible="isProcessing" />
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: var(--surface-ground);
  display: flex;
  flex-direction: column;
}

/* Header */
.page-header {
  padding: 1rem;
  background: var(--surface-card);
  border-bottom: 1px solid var(--surface-border);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.page-header h1 {
  margin: 0;
  font-size: 1.2rem;
}

/* Content */
.content {
  flex: 1;
  padding: 1rem;
}

/* Photo */
.photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

/* Form */
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
  font-size: 0.85rem;
  color: var(--text-color-secondary);
}

/* Actions */
.actions {
  padding: 1rem;
  border-top: 1px solid var(--surface-border);
  background: var(--surface-card);
}
</style>
