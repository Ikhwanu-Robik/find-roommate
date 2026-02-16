<script setup>
import AuthenticatedLayout from "@/layout/AuthenticatedLayout.vue";
import { useRoommateRecommendationStore } from "@/stores/roommateRecommendationStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../../utils/supabase";
import { useSessionStore } from "@/stores/sessionStore";

const router = useRouter();
const isProcessing = ref(false);

let errorDialog = ref();
let errorMessage = ref();

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

let status = ref();
let profession = ref();
let gender = ref();
let location = ref();
let budget = ref();

async function search() {
  isProcessing.value = true;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("status", status.value)
      .eq("profession", profession.value)
      .eq("gender", gender.value)
      .eq("preferred_location", location.value)
      .gte("budget", budget.value)
      .order("budget");

    if (error) throw error;

    useRoommateRecommendationStore().set({ recommendations: data });
    router.push("/find-roommate/profiles-recommendation");
  } catch (error) {
    errorMessage.value = error;
    errorDialog.value.visible = true;
  }
  isProcessing.value = false;
}

const ensureHasSession = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;
    if (!session) router.push("/login");

    useSessionStore().set({ session: session });
  } catch (error) {
    errorMessage.value = error;
    errorDialog.value.visible = true;

    router.push("/login");
  }
};

const ensureUserHasProfile = async () => {
  isProcessing.value = true;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", useSessionStore().session.user.id)
      .single();

    if (error) throw error;
  } catch (error) {
    errorMessage.value = error;
    errorDialog.value.visible = true;

    router.push("/create-profile");
  }
  isProcessing.value = false;
};

onMounted(async () => {
  isProcessing.value = true;
  await ensureHasSession();
  await ensureUserHasProfile();
  isProcessing.value = false;
});
</script>

<template>
  <AuthenticatedLayout>
    <header class="page-header">
      <h1>Cari Teman BagiSewa</h1>
    </header>

    <main class="content">
      <div class="content-wrapper">
        <Card>
          <template #content>
            <form class="form" @submit.prevent="search">
              <div class="field">
                <label>Status</label>
                <Select
                  v-model="status"
                  :options="statuses"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Menikah/single"
                  class="w-full"
                />
              </div>

              <div class="field">
                <label>Pekerjaan</label>
                <Select
                  v-model="profession"
                  :options="professions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Pilih pekerjaan"
                  class="w-full"
                />
              </div>

              <div class="field">
                <label>Gender</label>
                <Select
                  v-model="gender"
                  :options="genders"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Cowo/cewe"
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

              <Button
                label="Cari"
                icon="pi pi-search"
                class="w-full mt-2"
                type="submit"
              />
            </form>
          </template>
        </Card>
      </div>
    </main>
  </AuthenticatedLayout>

  <ErrorDialog ref="errorDialog" :message="errorMessage" />
  <LoadingDialog :visible="isProcessing" />
</template>

<style scoped>
/* Header */
.page-header {
  padding: 1rem;
  text-align: center;
  background: var(--surface-card);
  border-bottom: 1px solid var(--surface-border);
}

.page-header h1 {
  margin: 0;
  font-size: 1.2rem;
}

/* Content */
.content {
  flex: 1;
  padding: 1rem;
  display: flex;
  justify-content: center;
}

.content-wrapper {
  width: 100%;
  max-width: 520px; /* sweet spot for forms */
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
  font-size: 0.85rem;
  color: var(--text-color-secondary);
}

/* Map placeholder */
#map {
  height: 240px;
}

@media (min-width: 768px) {
  #map {
    height: 320px;
  }
}

@media (min-width: 1024px) {
  #map {
    height: 380px;
  }
}

@media (min-width: 768px) {
  .page-header h1 {
    font-size: 1.4rem;
  }

  .form {
    gap: 1.25rem;
  }
}
</style>
