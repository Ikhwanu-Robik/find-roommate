<script setup>
import ContactListItem from "@/components/ContactListItem.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let self = ref(null);
let chat_rooms = ref([]);

function getAcquintedProfiles() {
  axios
    .get("http://api.find-roommate.test/api/chat-rooms", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      chat_rooms.value = response.data.chat_rooms;
    })
    .catch((error) => {
      alert("Can't get your chat history. Please try again later");
      console.log(error);
    });
}

function getSelf() {
  axios
    .get("http://api.find-roommate.test/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      self.value = response.data.user.profile;
    });
}

function ensureAuthenticated() {
  axios
    .get("http://api.find-roommate.test/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      document.getElementById("container").style.display = "flex";
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status == 401) {
          router.push("/login");
        } else {
          alert("Server tidak dapat dihubungi, coba lagi nanti");
          router.push("/");
        }
      }
      console.log(error);
    });
}

onMounted(() => {
  ensureAuthenticated();
  getSelf();
  getAcquintedProfiles();
});
</script>

<template>
  <div id="container">
    <header>
      <h1>Riwayat Chat</h1>
    </header>
    <main>
      <ul class="chats-list" v-if="self && chat_rooms">
        <li v-for="chat_room in chat_rooms" :key="chat_room.id">
          <ContactListItem :chat_room="chat_room" :self="self"/>
        </li>
      </ul>
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
      <RouterLink to="/logout">
        <span class="link-icon">❌</span>
        <span>logout</span>
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

main .chats-list {
    list-style-type: none;
    width: 100vw;
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
