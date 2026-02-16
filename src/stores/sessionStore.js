import { defineStore } from "pinia";

export const useSessionStore = defineStore("session", {
  state: () => ({ session: null }),
  actions: {
    set(state) {
      this.$state = state;
    },
  },
});
