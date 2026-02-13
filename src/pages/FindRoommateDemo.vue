<script setup>
import ErrorDialog from "@/components/ErrorDialog.vue";
import AuthenticatedLayout from "@/layout/AuthenticatedLayout.vue";
import { useRoommateRecommendationStore } from "@/stores/roommateRecommendationStore";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// TODO: one page one input
// page 1 - input age range
// page 2 - input gender
// page 3 - input bio
// page 4 - select lodging

// TODO: scroll to top after being redirected here

const router = useRouter();
const isProcessing = ref(false);
const errors = ref();
const validationErrorDialog = ref();

let errorDialog = ref();
let errorMessage = ref();

const lodgings = ref();

const ageRanges = [
  { label: "18 - 24 Tahun", value: "18-24" },
  { label: "25 - 30 Tahun", value: "25-30" },
];

const genders = [
  { label: "Cowo", value: "male" },
  { label: "Cewe", value: "female" },
];

let gender = ref();
let age_range = ref();
let bio = ref();
let chosen_lodging = ref();

let min_age = computed(() => {
  if (age_range.value) {
    return age_range.value.split("-")[0];
  }
});
let max_age = computed(() => {
  if (age_range.value) {
    return age_range.value.split("-")[1];
  }
});

async function search() {
  isProcessing.value = true;

  await axios
    .get("http://api.find-roommate.test/api/match/profiles-recommendation", {
      withCredentials: true,
      withXSRFToken: true,
      params: {
        gender: gender.value,
        min_age: min_age.value,
        max_age: max_age.value,
        bio: bio.value,
        lodging_id: chosen_lodging.value?.id,
      },
    })
    .then((response) => {
      if (response.data.matching_profiles.length) {
        useRoommateRecommendationStore().recomendations =
          response.data.matching_profiles;

        router.push("/find-roommate/profiles-recommendation");
      }

      errorMessage.value = "There's no matching profiles for your criteria";
      errorDialog.value.visible = true;
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

async function getLodgings() {
  await axios
    .get("http://api.find-roommate.test/api/lodgings", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      lodgings.value = response.data.lodgings;
    })
    .catch((error) => {
      console.log(error);
      errorMessage.value = "Gagal mendapatkan data kos-kosan! coba lagi nanti";
      errorDialog.value.visible = true;
    });
}

async function setMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapAtCoords(position.coords.latitude, position.coords.longitude);
      },
      () => {
        console.log(
          "Can't get current position. Using default Latitude and Longitude."
        );

        setMapAtCoords();
      }
    );
  } else {
    console.log(
      "Geolocation not supported by this browser. Using default Latitude and Longitude."
    );

    setMapAtCoords();
  }
}

function setMapAtCoords(lat = -7.8846, lon = 111.046) {
  let map = L.map("map").setView([lat, lon], 12);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  lodgings.value.forEach((lodging) => {
    let popup = new L.Popup();
    popup.setContent(lodging.name);

    L.marker([lodging.latitude, lodging.longitude])
      .addTo(map)
      .bindPopup(popup, {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
      })
      .openPopup()
      .addEventListener("click", (e) => {
        let { lat, lng } = e.latlng;

        chosen_lodging.value = lodgings.value.find((lodging) => {
          return lodging.latitude == lat && lodging.longitude == lng;
        });
      });
  });

  map.setView([lat, lon], 12);
}

onMounted(async () => {
  isProcessing.value = true;
  await getLodgings();
  await setMap();
  isProcessing.value = false;
});
</script>

<template>
  <AuthenticatedLayout :shouldDisplayNav="false">
    <div class="signup-page">
      <Card class="signup-card">
        <template #title>
          <div class="header">
            <h4 class="subtitle">Bagaimana kriteria teman yang kamu cari?</h4>
          </div>
        </template>

        <template #content>
          <form class="form" @submit.prevent="search">
            <!-- Age -->
            <div class="field">
              <label>Usia</label>
              <Select
                v-model="age_range"
                :options="ageRanges"
                optionLabel="label"
                optionValue="value"
                placeholder="Pilih usia"
                class="w-full"
              />
            </div>

            <!-- Gender -->
            <div class="field">
              <label>Gender</label>
              <Select
                v-model="gender"
                :options="genders"
                optionLabel="label"
                optionValue="value"
                placeholder="Pilih gender"
                class="w-full"
              />
            </div>

            <!-- Bio -->
            <div class="field">
              <label>Deskripsi</label>
              <Textarea
                v-model="bio"
                rows="4"
                placeholder="Deskripsikan vibes yang kamu cari"
                class="w-full"
              />
            </div>

            <!-- Map -->
            <div class="field">
              <label>Kos</label>
              <span class="chosen-lodging" v-if="chosen_lodging">{{
                chosen_lodging.name
              }}</span> 
              <div id="map"></div>
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
  </AuthenticatedLayout>

  <ValidationErrorDialog
    ref="validationErrorDialog"
    :errors="validationErrors"
  />

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
