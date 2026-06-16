<script setup>
import { onMounted, onUnmounted, ref } from "vue";

let isMobile = ref(false);

const checkScreen = () => {
  isMobile.value = window.innerWidth < 768;
};

let demoButtonDrawerVisible = ref(false);
let demoGuideDrawerVisible = ref(true);

let demoButtonVisible = ref(true);
let demoGuideVisible = ref(false);

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>

<template>
  <Dialog v-if="!isMobile" v-model:visible="demoButtonVisible" :closable="false"
    ><Button
      @click="
        () => {
          demoButtonVisible = false;
          demoGuideVisible = true;
        }
      "
      >Show Test Guide</Button
    ></Dialog
  >
  <Dialog
    v-if="!isMobile"
    v-model:visible="demoGuideVisible"
    header="How to Test Match and Chat"
    :draggable="true"
    :modal="false"
    :closable="true"
    :style="{ width: '30rem' }"
    @hide="
      () => {
        demoButtonVisible = true;
      }
    "
  >
    The match and chat features by definition requires two users to interact
    with each other. To prepare for that we have created two demo accounts:
    <table :style="{ border: '1px solid', 'border-collapse': 'collapse' }">
      <tr :style="{ border: '1px solid' }">
        <td :style="{ border: '1px solid', padding: '0.2rem' }">Phone</td>
        <td :style="{ border: '1px solid', padding: '0.2rem' }">Password</td>
      </tr>
      <tr>
        <td :style="{ border: '1px solid', padding: '0.2rem' }">
          0812-0000-0001
        </td>
        <td :style="{ border: '1px solid', padding: '0.2rem' }">asdf</td>
      </tr>
      <tr>
        <td :style="{ border: '1px solid', padding: '0.2rem' }">
          0812-0000-0002
        </td>
        <td :style="{ border: '1px solid', padding: '0.2rem' }">jkl;</td>
      </tr>
    </table>
    <br />

    You may use this tab to log in to one account, and open another browser tab
    to log in to the other account.
    <br />
    <br />
    You could also create two accounts yourself.
  </Dialog>

  <Button
    v-if="isMobile"
    v-show="demoButtonDrawerVisible"
    @click="
      () => {
        demoButtonDrawerVisible = false;
        demoGuideDrawerVisible = true;
      }
    "
    :style="{ position: fixed, top: 0 }"
    >forget demo account?</Button
  >
  <Drawer
    v-if="isMobile"
    v-model:visible="demoGuideDrawerVisible"
    position="bottom"
    :style="{ height: '20rem' }"
    @hide="
      () => {
        demoButtonDrawerVisible = true;
      }
    "
  >
    The match and chat features by definition requires two users to interact
    with each other. To prepare for that we have created two demo accounts:
    <table :style="{ border: '1px solid', 'border-collapse': 'collapse' }">
      <tr :style="{ border: '1px solid' }">
        <td :style="{ border: '1px solid', padding: '0.2rem' }">Phone</td>
        <td :style="{ border: '1px solid', padding: '0.2rem' }">Password</td>
      </tr>
      <tr>
        <td :style="{ border: '1px solid', padding: '0.2rem' }">
          0812-0000-0001
        </td>
        <td :style="{ border: '1px solid', padding: '0.2rem' }">asdf</td>
      </tr>
      <tr>
        <td :style="{ border: '1px solid', padding: '0.2rem' }">
          0812-0000-0002
        </td>
        <td :style="{ border: '1px solid', padding: '0.2rem' }">jkl;</td>
      </tr>
    </table>
    <br />

    You may use this tab to log in to one account, and open another browser tab
    to log in to the other account.
    <br />
    <br />
    You could also create two accounts yourself.
  </Drawer>

  <RouterView />
</template>
