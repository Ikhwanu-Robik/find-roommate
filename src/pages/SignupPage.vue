<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

let full_name = ref("");

let profile_photo = ref("");
let profile_photo_path = ref("");

let phone = ref("");
let password = ref("");
let gender = ref("male");
let birthdate = ref("");
let address = ref("");
let bio = ref("");


function handleFileSelection(e) {
  profile_photo.value = e.target.files[0];

  let reader = new FileReader();

  reader.onload = function (e) {
    profile_photo_path.value = e.target.result;
  };

  reader.readAsDataURL(profile_photo.value);
}

function signup() {
  let formData = new FormData();
  formData.append("name", full_name.value);
  formData.append("profile_photo", profile_photo.value);
  formData.append("phone", phone.value);
  formData.append("password", password.value);
  formData.append("gender", gender.value);
  formData.append("birthdate", birthdate.value);
  formData.append("address", address.value);
  formData.append("bio", bio.value);

  axios
    .get("http://api.find-roommate.test/sanctum/csrf-cookie", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      axios
        .postForm("http://api.find-roommate.test/api/signup", formData, {
          withCredentials: true,
          withXSRFToken: true,
        })
        .then((response) => {
          alert("sign up successful");
          router.push("/login");
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status == 422) {
            let errors = e.response.data.errors;
            displayValidationError(errors);
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
      <h4>Signup</h4>
      <h1>BagiSewa</h1>
    </header>
    <main>
      <form action="/login" method="post">
        <label for="full_name">Full Name</label>
        <input
          type="text"
          name="full_name"
          id="full_name"
          placeholder="Ahmad Kasim"
          v-model="full_name"
        />
        <label for="profile_photo">Foto Profil</label>
        <input
          type="file"
          name="profile_photo"
          id="profile_photo"
          v-on:change="handleFileSelection"
        />
        <img
          v-if="profile_photo_path"
          :src="profile_photo_path"
          alt="preview of profile photo"
          width="50%"
        />
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
        <label for="gender">Gender</label>
        <select name="gender" id="gender" v-model="gender">
          <option value="male">Cowo</option>
          <option value="female">Cewe</option>
        </select>
        <label for="birthdate">Ulang Tahun</label>
        <input
          type="date"
          name="birthdate"
          id="birthdate"
          v-model="birthdate"
        />
        <label for="address">Alamat</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Jakarta"
          v-model="address"
        />
        <label for="bio">Bio</label>
        <textarea
          name="bio"
          id="bio"
          cols="30"
          rows="5"
          placeholder="tell me about yourself"
          v-model="bio"
        ></textarea>
        <button type="submit" @click.prevent.stop="signup">Signup</button>
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
