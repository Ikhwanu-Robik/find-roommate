<script setup>
import AuthenticatedLayout from "@/layout/AuthenticatedLayout.vue";
import { onMounted, ref } from "vue";
import { supabase } from "../../utils/supabase";
import { useSessionStore } from "@/stores/sessionStore";

const isProcessing = ref(false);
const errorDialog = ref();
const errorMessage = ref();

const isHavingUnsavedChange = ref(false);

const markUnsaved = () => {
  isHavingUnsavedChange.value = true;
};

const statuses = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
];

const genders = [
  { label: "Cowo", value: "cowo" },
  { label: "Cewe", value: "cewe" },
];

const locations = ref([]);

const professions = [
  { label: "Pelajar", value: "pelajar" },
  { label: "Karyawan", value: "karyawan" },
];

let profile = ref(null);

const updateUserProfile = async () => {
  if (
    !profile.value.full_name ||
    !profile.value.status ||
    !profile.value.profession ||
    !profile.value.gender ||
    !profile.value.preferred_location ||
    !profile.value.budget ||
    !profile.value.description ||
    !profile.value.phone
  ) {
    errorMessage.value = "Semua kolom harus diisi";
    errorDialog.value.visible = true;
    isProcessing.value = false;
    return;
  }

  let regexp = new RegExp(/^628[1-9]{2}\d{10}$/);
  if (!regexp.test(profile.value.phone)) {
    errorMessage.value = "Format nomor ponsel salah";
    errorDialog.value.visible = true;
    isProcessing.value = false;
    return;
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        name: profile.value.name,
        status: profile.value.status,
        profession: profile.value.profession,
        gender: profile.value.gender,
        preferred_location: profile.value.preferred_location,
        budget: profile.value.budget,
        phone: profile.value.phone,
        description: profile.value.description,
      })
      .eq("id", profile.value.id);

    if (error) throw error;

    isHavingUnsavedChange.value = false;
  } catch (error) {
    errorMessage.value = error;
    errorDialog.value.visible = true;
  }
};

const getUserProfile = async () => {
  isProcessing.value = true;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", useSessionStore().session.user.id)
      .single();

    if (error) throw error;

    profile.value = data;
  } catch (error) {
    errorMessage.value = error;
    errorDialog.value.visible = true;
  }
  isProcessing.value = false;
};

const getLocations = async () => {
  isProcessing.value = true;
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*");

    if (error) throw error;

    locations.value = data;
  } catch (error) {
    errorMessage.value = error;
    errorDialog.value.visible = true;
  }
  isProcessing.value = false;
};

onMounted(async () => {
  isProcessing.value = true;
  await getUserProfile();
  await getLocations();
  isProcessing.value = false;
});
</script>

<template>
  <AuthenticatedLayout>
    <!-- Header -->
    <header class="page-header">
      <h1>Profile</h1>
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
          <div class="field">
            <label for="full_name">Name</label>
            <InputText
              id="full_name"
              v-model="profile.name"
              class="w-full"
              placeholder="nama lengkap"
              @input="markUnsaved"
            >
            </InputText>
          </div>

          <div class="field">
            <label for="phone">Phone Number</label>
            <InputText
              id="phone"
              v-model="profile.phone"
              class="w-full"
              placeholder="62812xxxxxxx"
            >
            </InputText>
          </div>

          <div class="field">
            <label for="sta tus">Status</label>
            <Select
              id="status"
              v-model="profile.status"
              :options="statuses"
              optionLabel="label"
              optionValue="value"
              placeholder="married/single"
              class="w-full"
              @change="markUnsaved"
            />
          </div>

          <div class="field">
            <label for="gender">Gender</label>
            <Select
              id="gender"
              v-model="profile.gender"
              :options="genders"
              optionLabel="label"
              optionValue="value"
              placeholder="male/female"
              class="w-full"
              @change="markUnsaved"
            />
          </div>

          <div class="field">
            <label for="profession">Profession</label>
            <Select
              id="profession"
              v-model="profile.profession"
              :options="professions"
              optionLabel="label"
              optionValue="value"
              placeholder="what do you do?"
              class="w-full"
              @change="markUnsaved"
            />
          </div>

          <div class="field">
            <label>Target Aparment/Kos Location</label>
            <Select
              v-model="profile.preferred_location"
              :options="locations"
              optionLabel="name"
              optionValue="name"
              placeholder="choose location"
              class="w-full"
              @change="markUnsaved"
            />
          </div>

          <div class="field">
            <label>Budget</label>
            <InputNumber
              v-model="profile.budget"
              placeholder="budget estimate"
              class="w-full"
              @input="markUnsaved"
            />
          </div>

          <div class="field">
            <label for="description">Bio</label>
            <Textarea
              id="description"
              v-model="profile.description"
              rows="4"
              placeholder="tell your story"
              class="w-full"
              @input="markUnsaved"
            />
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
        @click="updateUserProfile"
      />
    </footer>
  </AuthenticatedLayout>

  <ValidationErrorDialog ref="validationErrorDialog" :errors="errors" />
  <ErrorDialog ref="errorDialog" :message="errorMessage" />
  <LoadingDialog :visible="isProcessing" />
</template>

<style scoped>
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

@media (min-width: 768px) {
  .content {
    width: 50vw;
    align-self: center;
  }

  .actions {
    align-self: flex-end;
    margin-right: 25vw;
  }
}
</style>
