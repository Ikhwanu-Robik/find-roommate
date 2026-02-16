import { defineStore } from "pinia";

export const useRoommateRecommendationStore = defineStore(
  "roommateRecommendation",
  {
    state: () => ({ recommendations: [] }),
    actions: {
      set(state) {
        this.$state = state;
      },
    },
  }
);
