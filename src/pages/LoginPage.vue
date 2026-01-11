<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

let phone = ref("");
let password = ref("");

function login() {
  let formData = new FormData();
  formData.append("phone", phone.value);
  formData.append("password", password.value);

  axios
    .get("http://api.find-roommate.test/sanctum/csrf-cookie", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      axios
        .postForm("http://api.find-roommate.test/login", formData, {
          withCredentials: true,
          withXSRFToken: true,
        })
        .then((response) => {
          alert("log in successful");
          router.push("/find-roommate");
        })
        .catch((e) => {
          console.log(e);

          if (e.response.status == 422) {
            let errors = e.response.data.errors;

            displayValidationError(errors);
          } else if (e.response.status == 401) {
            alert("Your phone or password is wrong");
          } else {
            alert("Something is wrong, please try again later");
          }
        });
    });
}

function displayValidationError(errors) {
  let allStringified = "";
  for (let error in errors) {
    let messages = errors[error];

    let stringified = error + ": ";

    messages.forEach((message) => {
      stringified += message + ", ";
    });

    allStringified += stringified + "\n";
  }

  alert("Form Inputs Invalid\n" + allStringified);
}

function redirectIfLoggedIn() {
  axios
    .get("http://api.find-roommate.test/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      router.push("/find-roommate");
    });
}

onMounted(redirectIfLoggedIn);
</script>

<template>
  <div id="container">
    <header>
      <h4>Login</h4>
      <h1>BagiSewa</h1>
    </header>
    <main>
      <form action="/login" method="post">
        <label for="phone">Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="0812-9087-1029"
          v-model="phone"
        />
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          v-model="password"
        />
        <button type="submit" @click.prevent.stop="login">Login</button>
      </form>
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

form {
  display: flex;
  gap: 0.3em;
  flex-direction: column;
}

form > button {
  width: 80%;
  align-self: center;
}
</style>
