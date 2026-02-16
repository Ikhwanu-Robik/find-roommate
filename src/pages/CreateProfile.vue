<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../../utils/supabase";
import { useSessionStore } from "@/stores/sessionStore";

const router = useRouter();
const errorDialog = ref();
const errorMessage = ref();
const isProcessing = ref(false);

const statuses = [
  { label: "Single", value: "single" },
  { label: "Menikah", value: "married" },
];

const genders = [
  { label: "Cowo", value: "male" },
  { label: "Cewe", value: "female" },
];

const locations = [
  { label: "Dekat UNS", value: "near-UNS" },
  { label: "Dekat UNY", value: "near-UNY" },
];

const professions = [
  { label: "Pelajar", value: "student" },
  { label: "Karyawan", value: "salaryman" },
];

let full_name = ref();
let status = ref();
let profession = ref();
let gender = ref();
let location = ref();
let budget = ref();
let phone = ref();

async function createProfile() {
  isProcessing.value = true;

  try {
    const { error } = await supabase.from("profiles").insert({
      name: full_name.value,
      status: status.value,
      profession: profession.value,
      gender: gender.value,
      preferred_location: location.value,
      budget: budget.value,
      description: description.value,
      phone: phone.value,
      user_id: useSessionStore().session.user.id
    });

    if (error) throw error;

    router.push("/find-roommate");
  } catch (error) {
    errorMessage.value = error;
    errorDialog.value.visible = true;
  }

  isProcessing.value = false;
}

const ensureHasSession = async () => {
  try {
    const { data: {session}, error } = await supabase.auth.getSession();

    if (error) throw error;
    if (!session) router.push("/login");

    useSessionStore().set({ session: session });
  } catch (error) {
    errorMessage.value = error;
    errorDialog.value.visible = true;

    router.push("/login");
  }
};

onMounted(async () => {
  isProcessing.value = true;
  await ensureHasSession();
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
            <label for="full_name">Nama Lengkap</label>
            <InputText
              id="full_name"
              v-model="full_name"
              class="w-full"
              placeholder="nama lengkap"
            >
            </InputText>
          </div>

          <div class="field">
            <label for="phone">No WhatsApp</label>
            <InputText
              id="phone"
              v-model="phone"
              class="w-full"
              placeholder="62812xxxxxxx"
            >
            </InputText>
          </div>

          <div class="field">
            <label for="sta tus">Status</label>
            <Select
              id="status"
              v-model="status"
              :options="statuses"
              optionLabel="label"
              optionValue="value"
              placeholder="menikah/single"
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
            <label for="profession">Profesi</label>
            <Select
              id="profession"
              v-model="profession"
              :options="professions"
              optionLabel="label"
              optionValue="value"
              placeholder="Pilih profesi"
              class="w-full"
            />
          </div>

          <div class="field">
            <label>Lokasi</label>
            <Select
              v-model="location"
              :options="locations"
              optionLabel="label"
              optionValue="value"
              placeholder="Pilih lokasi"
              class="w-full"
            />
          </div>

          <div class="field">
            <label>Budget</label>
            <InputNumber
              v-model="budget"
              placeholder="Perkiraan budgetmu"
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="description">Deskripsi Singkat</label>
            <Textarea
              id="description"
              v-model="description"
              rows="4"
              placeholder="Ceritakan dirimu secara singkat"
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
