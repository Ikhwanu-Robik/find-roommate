import { defineStore } from "pinia";

export const useRoommateRecommendationStore = defineStore(
  "roommateRecommendation",
  {
    state: () => ({ recomendations: [] }),
    actions: {
      set(state) {
        this.$state = state;
      },
    },
  }
);
