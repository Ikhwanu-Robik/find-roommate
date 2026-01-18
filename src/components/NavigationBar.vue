<script setup>
import { ref } from "vue";
import LogoutDialog from "@/components/LogoutDialog.vue";

const logoutDialog = ref(null);
</script>

<template>
  <nav class="bottom-nav">
    <RouterLink to="/find-roommate" class="nav-item active">
      <i class="pi pi-search"></i>
      <span>Cari</span>
    </RouterLink>

    <RouterLink to="/chats" class="nav-item">
      <i class="pi pi-comments"></i>
      <span>Chat</span>
    </RouterLink>

    <RouterLink to="/profile" class="nav-item">
      <i class="pi pi-user"></i>
      <span>Profil</span>
    </RouterLink>

    <RouterLink
      to="#"
      class="nav-item"
      @click.prevent="logoutDialog.visible = true"
    >
      <i class="pi pi-sign-out"></i>
      <span>Logout</span>
    </RouterLink>

    <LogoutDialog ref="logoutDialog" />
  </nav>
</template>

<style scoped>
.bottom-nav {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
  background: var(--surface-card);
  border-top: 1px solid var(--surface-border);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: var(--text-color-secondary);
  text-decoration: none;
}

.nav-item i {
  font-size: 1.1rem;
}

.nav-item.active,
.nav-item.router-link-active {
  color: var(--primary-color);
}
</style>
