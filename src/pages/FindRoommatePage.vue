<script setup>
import axios from "axios";
import { onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function ensureAuthenticated() {
  axios
    .get("http://api.find-roommate.test/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      if (response.status == 200) {
        document.getElementById("container").style.display = "flex";
      }
    })
    .catch((error) => {
      if (error.status != 401) {
        console.log(error);
        alert("Server tidak dapat dihubungi, coba lagi nanti");
        router.push("/");
      } else if (error.status == 401) {
        router.push("/login");
      }
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

onMounted(() => {
  ensureAuthenticated();
  setMap();
});
</script>

<template>
  <div id="container">
    <header>
      <h1>Cari Teman BagiSewa</h1>
    </header>
    <main>
      <form action="/find-roommate" method="post">
        <label for="age_range">Usia</label>
        <select name="age_range" id="age_range">
          <option value="18-24">18 - 24 Tahun</option>
          <option value="25-30">25 - 30 Tahun</option>
          <option value="31-40">31 - 40 Tahun</option>
        </select>
        <label for="gender">Gender</label>
        <select name="gender" id="gender">
          <option value="male">Cowo</option>
          <option value="female">Cewe</option>
        </select>
        <label for="bio">Deskripsi</label>
        <textarea
          name="bio"
          id="bio"
          cols="30"
          rows="10"
          placeholder="deskripsikan vibes yang kamu cari"
        ></textarea>
        <label for="lodging_id">Kos</label>
        <div id="map"></div>
        <button @click.prevent.stop="">Cari</button>
      </form>
    </main>
    <nav>
      <RouterLink to="/find-roommate">
        <span class="link-icon">🔎</span>
        <span>cari teman</span>
      </RouterLink>
      <RouterLink to="/chats">
        <span class="link-icon">🗨️</span>
        <span>chat</span>
      </RouterLink>
      <RouterLink to="/profile">
        <span class="link-icon">👤</span>
        <span>profil</span>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
#container {
  height: 100vh;
  display: none;
  /* change to display: flex; if authenticated */
  flex-direction: column;
  justify-content: flex-start;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-weight: bold;
  font-size: 18px;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 1em;
  padding-bottom: 6em;
  gap: 2em;
}

main form {
  display: flex;
  flex-direction: column;
}

main form #map {
  background-color: white;
  color: black;
  height: 15em;
}

main form button {
  width: 80%;
  align-self: center;
  margin-top: 1em;
}

nav {
  align-self: center;
  position: fixed;
  bottom: 0;
  padding-bottom: 2em;

  display: flex;
  gap: 0.3em;
}

nav a {
  background-color: rgb(36, 36, 36);
  width: 6em;
  height: 6em;
  border-radius: 10px;
  color: gray;
  font-size: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

nav a .link-icon {
  font-size: 24px;
}
</style>
