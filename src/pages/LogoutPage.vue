<script setup>
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  axios
    .post(
      "http://api.find-roommate.test/logout",
      {},
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    )
    .then((response) => {
      alert("Logout successful");
      router.push("/");
    })
    .catch((error) => {
      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Something is wrong. Please try again later");
      }
      console.log(error);
    });
}
</script>

<template>
  <div id="container">
    <header>
      <h1>Logout?</h1>
    </header>
    <main>
      <p>Kamu akan diarahkan ke landing page setelah logout</p>
      <nav>
        <RouterLink to="/find-roommate">
          <button>No</button>
        </RouterLink>
        <button @click="logout">Yes</button>
      </nav>
    </main>
  </div>
</template>

<style scoped>
#container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-weight: bold;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 3em;
  gap: 2em;
}
</style>
