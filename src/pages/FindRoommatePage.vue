<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isProcessing = ref(false);

const ageRanges = [
  { label: "18 - 24 Tahun", value: "18-24" },
  { label: "25 - 30 Tahun", value: "25-30" },
];

const genders = [
  { label: "Cowo", value: "male" },
  { label: "Cewe", value: "female" },
];

let errorDialog = ref();
let errorMessage = ref();

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
}

onMounted(async () => {
  isProcessing.value = true;
  await ensureAuthenticated();
  await setMap();
  isProcessing.value = false;
});
</script>

<template>
  <div class="find-page">
    <!-- Header -->
    <header class="page-header">
      <h1>Cari Teman BagiSewa</h1>
    </header>

    <!-- Content -->
    <main class="content">
      <Card>
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
    </main>

    <!-- Bottom Navigation -->
    <NavigationBar />

    <ErrorDialog ref="errorDialog" :message="errorMessage" />
    <LoadingDialog :visible="isProcessing" />
  </div>
</template>

<style scoped>
.find-page {
  min-height: 100vh;
  background: var(--surface-ground);
  display: flex;
  flex-direction: column;
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
  height: 140px;
  border-radius: 0.75rem;
  background: var(--surface-200);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color-secondary);
  font-size: 0.85rem;
}
</style>
