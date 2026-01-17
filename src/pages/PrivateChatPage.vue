<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import echo from "../echo.js";

const route = useRoute();
const router = useRouter();

let self = ref();
let chats = ref();

let messageToBeSent = ref();

let partner = ref();

function getPartner() {
  axios
    .get("http://api.find-roommate.test/api/chat-rooms", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      response.data.chat_rooms.forEach((chat_room) => {
        if (chat_room.id == route.params.id) {
          chat_room.customer_profiles.forEach((profile) => {
            if (profile.id != self.value.id) {
              partner.value = profile;
            }
          });
        }
      });
    })
    .catch((error) => {
      alert("Can't get the other user's data. Please try again later");
      console.log(error);
    });
}

function sendChat() {
  let formData = new FormData();
  formData.append("message", messageToBeSent.value);
  messageToBeSent.value = "";

  axios
    .post(
      "http://api.find-roommate.test/api/chat-rooms/" +
        route.params.id +
        "/chats",
      formData,
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    )
    .then((response) => {})
    .catch((error) => {
      alert("Failed to send message! Please try again later");
      console.log(error);
      messageToBeSent.value = formData.get("message");
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

function getChats() {
  axios
    .get(
      "http://api.find-roommate.test/api/chat-rooms/" +
        route.params.id +
        "/chats",
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    )
    .then((response) => {
      chats.value = response.data.chats;
    })
    .catch((error) => {
      alert("Sorry, we can't get your chats, please try again later");
      console.log(error);
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

function listenForChats(chatRoomId) {
  echo.private("ChatRooms." + chatRoomId).listen("NewChat", (e) => {
    console.log(e);

    chats.value.push(e);
  });
}

onMounted(() => {
  ensureAuthenticated();
  getSelf();
  getPartner();
  getChats();
  listenForChats(route.params.id);
});
</script>

<template>
  <div id="container">
    <header>
      <h1 v-if="chats && partner">
        {{ partner ? partner.full_name : "Error, can't get name" }}
      </h1>
    </header>
    <main>
      <ul class="chats-list" v-if="chats && self">
        <li
          v-for="chat in chats"
          :key="chat.id"
          class="chat-item"
          :class="{ selfschat: chat.sender.id == self.id }"
        >
          {{ chat.message }}
        </li>
      </ul>
      <form
        :action="'/chat-rooms/' + route.params.id + '/chats'"
        method="post"
        id="send-chat-form"
      >
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type your message here"
          v-model="messageToBeSent"
        />
        <button type="submit" @click.prevent.stop="sendChat">Send</button>
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
  position: fixed;
  background-color: rgb(56, 56, 56);
  width: 100%;
  padding: 1em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

h1 {
  font-weight: bold;
  font-size: 18px;
}

main {
  margin-top: 3.5em;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 1em;
  padding-bottom: 6em;
  gap: 2em;
}

main .chats-list {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  list-style-type: none;
  width: 100%;

  margin-bottom: 6em;
}

.chat-item {
  background-color: rgb(56, 56, 56);
  padding: 0.5em;
  width: fit-content;
}

.selfschat {
  align-self: flex-end;
}

main #send-chat-form {
  position: fixed;
  bottom: 8em;
}

main #send-chat-form input,
main #send-chat-form button {
  font-size: 16px;
  padding: 0.5em;
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
