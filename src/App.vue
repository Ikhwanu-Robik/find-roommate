<script setup>
import { ref } from "vue";

let demoButtonVisible = ref(true);
let demoGuideVisible = ref(false);
</script>

<template>
  <RouterView />
  <Dialog v-model:visible="demoButtonVisible" :closable="false"
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
  </Dialog>
</template>
