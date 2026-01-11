import "./assets/main.css";

import "../node_modules/leaflet/dist/images/layers-2x.png";
import "../node_modules/leaflet/dist/images/layers.png";
import "../node_modules/leaflet/dist/images/marker-icon-2x.png";
import "../node_modules/leaflet/dist/images/marker-icon.png";
import "../node_modules/leaflet/dist/images/marker-shadow.png";
import "../node_modules/leaflet/dist/leaflet.css";
import "../node_modules/leaflet/dist/leaflet.js";

import { createApp } from "vue";
import App from "./App.vue";

import { createWebHashHistory, createRouter } from "vue-router";
import FindRoommatePage from "./pages/FindRoommatePage.vue";
import LandingPage from "./pages/LandingPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import LogoutPage from "./pages/LogoutPage.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/login", component: LoginPage },
  { path: "/find-roommate", component: FindRoommatePage },
  { path: "/logout", component: LogoutPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
