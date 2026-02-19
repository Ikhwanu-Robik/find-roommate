<script setup>
import AuthenticatedLayout from "@/layout/AuthenticatedLayout.vue";
import { useRoommateRecommendationStore } from "@/stores/roommateRecommendationStore";
import { ref } from "vue";

const isProcessing = ref(false);
const roommateRecommendationStore = useRoommateRecommendationStore();

const matchingprofiles = roommateRecommendationStore.recommendations;
</script>

<template>
  <AuthenticatedLayout>
    <header class="page-header">
      <h1>Roommate Recommendations</h1>
    </header>

    <main class="content" v-if="matchingprofiles">
      <Card
        v-for="profile in matchingprofiles"
        :key="profile.id"
        class="user-card"
      >
        <template #content>
          <h4>{{ profile.name }}</h4>
          <div>
            {{ profile.gender }}
          </div>
          <div>
            {{ profile.preferred_location }}
          </div>
          <div>
            Budget: IDR {{ profile.budget }}
          </div>
          <div>
            {{ profile.profession }}
          </div>
          <div>
            {{ profile.status }}
          </div>
          <p>
            {{ profile.description }}
          </p>
          <a :href="'https://wa.me/' + profile.phone">
            <Button class="chat-button">Chat</Button>
          </a>
        </template>
      </Card>
    </main>
  </AuthenticatedLayout>

  <ErrorDialog ref="errorDialog" :message="errorMessage" />
  <LoadingDialog :visible="isProcessing" />
</template>

<style scoped>
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
