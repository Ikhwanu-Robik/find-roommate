import "../node_modules/leaflet/dist/images/layers-2x.png";
import "../node_modules/leaflet/dist/images/layers.png";
import "../node_modules/leaflet/dist/images/marker-icon-2x.png";
import "../node_modules/leaflet/dist/images/marker-icon.png";
import "../node_modules/leaflet/dist/images/marker-shadow.png";
import "../node_modules/leaflet/dist/leaflet.css";
import "../node_modules/leaflet/dist/leaflet.js";

import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";

import { createWebHashHistory, createRouter } from "vue-router";
import FindRoommatePage from "./pages/FindRoommatePage.vue";
import SelectRoommatePage from "./pages/SelectRoommatePage.vue";
import LandingPage from "./pages/LandingPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import SignupPage from "./pages/SignupPage.vue";
import SignupPageDetails from "./pages/CreateProfile.vue";
import EditProfilePage from "./pages/EditProfilePage.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/signup", component: SignupPage },
  { path: "/create-profile", component: SignupPageDetails },
  { path: "/login", component: LoginPage },
  { path: "/find-roommate", component: FindRoommatePage },
  {
    path: "/find-roommate/profiles-recommendation",
    component: SelectRoommatePage,
  },
  { path: "/profile", component: EditProfilePage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(pinia)
  .mount("#app");
