<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let props = defineProps(["chat_room", "self"]);

let profile = ref(((props.chat_room.customer_profiles[0].id != props.self.id) ? props.chat_room.customer_profiles[0] : props.chat_room.customer_profiles[1]));

function openPrivateChatPage() {
  router.push("/chats/" + props.chat_room.id);
}
</script>

<template>
  <button @click="openPrivateChatPage">
    <img
      :src="'http://api.find-roommate.test/storage/' + profile.profile_photo"
      alt="profile_photo"
      class="profile-photos"
    />
    <h4>{{ profile.full_name }}</h4>
  </button>
</template>

<style scoped>
button {
  display: flex;
  width: 80%;
  gap: 1em;
  font-size: 20px;
  padding: 0.5em;
  align-items: center;
}

.profile-photos {
  height: 3em;
  border-radius: 50%;
}
</style>
