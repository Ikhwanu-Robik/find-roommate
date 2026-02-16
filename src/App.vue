<script setup>
import { onMounted } from "vue";
import { supabase } from "../utils/supabase";
import { useRouter } from "vue-router";
import { useSessionStore } from "./stores/sessionStore";

const router = useRouter();

const redirectIfNotAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    useSessionStore().set({ session: session });
  } else {
    router.push("/login");
  }
};

onMounted(async () => {
  await redirectIfNotAuth();
});
</script>

<template>
  <RouterView />
</template>
