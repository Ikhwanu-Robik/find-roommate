<script setup>
import axios from "axios";
import { nextTick, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import echo from "../echo.js";

const route = useRoute();
const router = useRouter();
const isProcessing = ref(false);

let self = ref();
let chats = ref([]);

let messageToBeSent = ref(null);

let partner = ref();

let errorDialog = ref();
let errorMessage = ref();

async function getPartner() {
  await axios
    .get("http://api.find-roommate.test/api/chat-rooms/" + route.params.id, {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      let chat_room = response.data.chat_room;

      chat_room.customer_profiles.forEach((profile) => {
        if (profile.id != self.value.id) {
          partner.value = profile;
        }
      });
    })
    .catch((error) => {
      errorMessage.value =
        "Can't get the other user's data. Please try again later";
      errorDialog.value.visible = true;
      console.log(error);
    });
}

async function sendChat() {
  if (!messageToBeSent.value) {
    return;
  }

  isProcessing.value = true;

  let formData = new FormData();
  formData.append("message", messageToBeSent.value);
  messageToBeSent.value = "";

  await axios
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
      errorMessage.value = "Gagal mengirim pesan, coba lagi nanti";
      errorDialog.value.visible = true;

      console.log(error);
      messageToBeSent.value = formData.get("message");
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
      self.value = response.data.user.profile;
    });
}

async function getChats() {
  await axios
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
      response.data.chats.forEach((chat) => {
        chats.value.push(chat);
      });
    })
    .catch((error) => {
      errorMessage.value =
        "Sorry, we can't get your chats, please try again later";
      errorDialog.value.visible = true;
      console.log(error);
    });
}

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
          errorMessage.value = "Server tidak dapat dihubungi, coba lagi nanti";
          errorDialog.value.visible = true;
          router.push("/");
        }
      }
      console.log(error);
    });
}

function listenForChats(chatRoomId) {
  echo.private("ChatRooms." + chatRoomId).listen("NewChat", (e) => {
    chats.value.push(e);
  });
}

let chatScrollPanel = ref();

async function scrollToBottom() {
  await nextTick();

  const content = chatScrollPanel.value?.$el?.querySelector(
    ".p-scrollpanel-content"
  );

  if (content) {
    content.scrollTop = content.scrollHeight;
  }
}

watch(
  () => chats.value.length,
  () => {
    scrollToBottom();
  }
);

onMounted(async () => {
  isProcessing.value = true;
  await ensureAuthenticated();
  await getSelf();
  await getPartner();
  await getChats();
  listenForChats(route.params.id);
  isProcessing.value = false;
});
</script>

<template>
  <Card class="chat-card">
    <!-- Header -->
    <template #title>
      <div class="chat-header">
        <i class="pi pi-user"></i>
        <span>
          {{ partner ? partner.full_name : "Unknown User" }}
        </span>
      </div>
    </template>

    <!-- Chat messages -->
    <template #content>
      <ScrollPanel class="chat-messages" ref="chatScrollPanel">
        <div
          v-for="chat in chats"
          :key="chat.id"
          class="chat-bubble"
          :class="{ self: chat.sender.id === self.id }"
        >
          {{ chat.message }}
        </div>
      </ScrollPanel>
    </template>

    <!-- Input area -->
    <template #footer>
      <form class="chat-input" @submit.prevent="sendChat">
        <InputText
          v-model="messageToBeSent"
          placeholder="Type your message..."
          class="flex-1"
        />
        <Button label="Send" icon="pi pi-send" type="submit" />
      </form>
      <NavigationBar />
    </template>
  </Card>

  <ErrorDialog ref="errorDialog" :message="errorMessage" />
  <LoadingDialog :visible="isProcessing" />
</template>

<style scoped>
.chat-card {
  max-width: 720px;
  height: 80vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

/* Header */
.chat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Messages */
.chat-messages {
  height: 75vh;
  padding: 1rem;
}

.chat-bubble {
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  background: var(--p-surface-700);
  align-self: flex-start;
}

.chat-bubble.self {
  background: var(--p-primary-color);
  color: white;
  margin-left: auto;
}

/* Input */
.chat-input {
  display: flex;
  gap: 0.5rem;
}
</style>
