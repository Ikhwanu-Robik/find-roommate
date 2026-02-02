<script setup>
import AuthenticatedLayout from "@/layout/AuthenticatedLayout.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const isProcessing = ref(false);

let self = ref(null);
let chat_rooms = ref([]);

let errorDialog = ref();
let errorMessage = ref();

async function getAcquintedProfiles() {
  await axios
    .get("http://api.find-roommate.test/api/chat-rooms", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      chat_rooms.value = response.data.chat_rooms;
    })
    .catch((error) => {
      console.log(error);
      errorMessage.value =
        "Can't get your chat history. Please try again later";
      errorDialog.value.visible = true;
    });
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

onMounted(async () => {
  isProcessing.value = true;
  await getSelf();
  await getAcquintedProfiles();
  isProcessing.value = false;
});
</script>

<template>
  <AuthenticatedLayout>
    <header class="page-header">
      <h1>Riwayat Chat</h1>
    </header>
    <main class="content">
      <Card>
        <template #content>
          <ScrollPanel class="contacts">
            <ul class="chats-list" v-if="self && chat_rooms">
              <li v-for="chat_room in chat_rooms" :key="chat_room.id">
                <RouterLink :to="'/chats/' + chat_room.id">
                  <Button class="contact-button">
                    <img
                      :src="
                        'http://api.find-roommate.test/storage/' +
                        (chat_room.customer_profiles[0].id != self.id
                          ? chat_room.customer_profiles[0].profile_photo
                          : chat_room.customer_profiles[1].profile_photo)
                      "
                      alt="profile_photo"
                      class="profile-photos"
                    />
                    <h4>
                      {{
                        chat_room.customer_profiles[0].id != self.id
                          ? chat_room.customer_profiles[0].full_name
                          : chat_room.customer_profiles[1].full_name
                      }}
                    </h4>
                  </Button>
                </RouterLink>
              </li>
            </ul>
          </ScrollPanel>
        </template>
      </Card>
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
  height: 70vh;
}

.chats-list {
  list-style-type: none;
}

.contacts {
  height: 70vh;
}

.contact-button {
  width: 100%;
}

.profile-photos {
  height: 3em;
  border-radius: 50%;
}

@media (min-width: 768px) {
  .content {
    width: 50vw;
    align-self: center;
  }
}
</style>
