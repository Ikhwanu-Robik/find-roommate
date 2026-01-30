<script setup>
import { useRoommateRecommendationStore } from "@/stores/roommateRecommendationStore";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isProcessing = ref(false);
const roommateRecommendationStore = useRoommateRecommendationStore();

const matchingUsers = roommateRecommendationStore.recomendations;

let errorDialog = ref();
let errorMessage = ref();

async function inviteToChat(customerProfileId) {
  isProcessing.value = true;

  let formData = new FormData();
  await axios
    .post(
      "http://api.find-roommate.test/api/match/profiles/" +
        customerProfileId +
        "/chat",
      formData,
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    )
    .then((response) => {
      let chatRoomId = response.data.chat_room_id;

      router.push("/chats/" + chatRoomId);
    })
    .catch((error) => {
      errorMessage.value =
        "Can't initiate chat with user, please try again later";
      errorDialog.value.visible = true;
      console.log(error);
    });

  isProcessing.value = false;
}

async function ensureAuthenticated() {
  await axios
    .get("http://api.find-roommate.test/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {})
    .catch((error) => {
      isProcessing.value = false;

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

onMounted(async () => {
  isProcessing.value = true;
  await ensureAuthenticated();
  isProcessing.value = false;
});
</script>

<template>
  <div class="profile-page">
    <header class="page-header">
      <h1>Rekomendasi Teman Sewa</h1>
    </header>

    <main class="content" v-if="matchingUsers">
      <Card v-for="user in matchingUsers" :key="user.id" class="user-card">
        <template #content>
          <img
            :src="
              'http://api.find-roommate.test/storage/' +
              user.customer_profile.profile_photo
            "
            alt="profile_photo"
            class="profile-photo"
          />
          <h4>{{ user.customer_profile.full_name }}</h4>
          <span class="profile-age">{{ user.customer_profile.birthdate }}</span>
          <p>
            {{ user.customer_profile.gender }},
            {{ user.customer_profile.bio }}
          </p>
          <Button
            class="chat-button"
            @click="inviteToChat(user.customer_profile_id)"
            >Chat</Button
          >
        </template>
      </Card>
    </main>

    <NavigationBar />

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

.content {
  display: flex;
  overflow-x: scroll;
  flex: 1;
  padding: 1rem;
  gap: 1em;
}

.user-card {
  width: 100vw;
}

@media (min-width: 768px) {
  .user-card {
    width: 30vw;
  }
}

@media (min-width: 1024px) {
  .user-card {
    width: 25vw;
  }
}

.profile-photo {
  width: 17em;
}
</style>
