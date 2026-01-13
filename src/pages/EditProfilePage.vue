<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let isHavingUnsavedChange = ref(false);

let profile_photo = ref(null);
let profile_photo_path = ref(null);

function handleFileSelection(e) {
  isHavingUnsavedChange.value = true;

  profile_photo.value = e.target.files[0];

  let reader = new FileReader();

  reader.onload = function (e) {
    profile_photo_path.value = e.target.result;
  };

  reader.readAsDataURL(profile_photo.value);
}

function updateProfile() {
  let formData = new FormData();
  formData.append("full_name", profile.value.full_name);
  formData.append("gender", profile.value.gender);
  formData.append("birthdate", profile.value.birthdate);
  formData.append("address", profile.value.address);
  formData.append("bio", profile.value.bio);
  if (profile_photo.value != null) {
    formData.append("profile_photo", profile_photo.value);
  }
  // because our backend use PHP which doesn't
  // support sending data through PUT
  formData.append("_method", "PUT");

  axios
    .post(
      "http://api.find-roommate.test/api/profiles/" + profile.value.id,
      formData,
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    )
    .then((response) => {
      isHavingUnsavedChange.value = false;
    })
    .catch((error) => {
      alert("Can't save changes, please try again later");
      if (error.response) {
        if (error.response.status == 422) {
          displayValidationError(error.response.data.errors);
        }
      }
      console.log(error);
    });
}

let profile = ref(null);

function ensureAuthenticated() {
  axios
    .get("http://api.find-roommate.test/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      document.getElementById("container").style.display = "flex";
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status == 401) {
          router.push("/login");
        } else {
          alert("Server tidak dapat dihubungi, coba lagi nanti");
          router.push("/");
        }
      }
      console.log(error);
    });
}

function getSelfAndDisplay() {
  axios
    .get("http://api.find-roommate.test/api/me", {
      withCredentials: true,
      withXSRFToken: true,
    })
    .then((response) => {
      profile.value = response.data.user.profile;
      profile_photo_path.value =
        "http://api.find-roommate.test/storage/" + profile.value.profile_photo;
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

onMounted(() => {
  ensureAuthenticated();
  getSelfAndDisplay();
});
</script>

<template>
  <div id="container">
    <header>
      <h1>Profil</h1>
      <h4 class="warning" v-if="isHavingUnsavedChange">change not saved</h4>
    </header>
    <main>
      <section v-if="profile" id="profile">
        <img
          :src="profile_photo_path"
          alt="profile_photo"
          width="70%"
          id="profile_photo"
        />
        <label for="change_profile_photo">change profile photo</label>
        <input
          type="file"
          id="change_profile_photo"
          @change="handleFileSelection"
        />
        <table id="user-data">
          <tbody>
            <tr>
              <td><label for="full_name">Full name</label></td>
              <td>
                <input
                  id="full_name"
                  type="text"
                  v-model="profile.full_name"
                  @change="isHavingUnsavedChange = true"
                />
              </td>
            </tr>
            <tr>
              <td><label for="gender">Gender</label></td>
              <td>
                <select
                  name="gender"
                  id="gender"
                  v-model="profile.gender"
                  @change="isHavingUnsavedChange = true"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label for="birthdate">Birthdate</label></td>
              <td>
                <input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  v-model="profile.birthdate"
                  @change="isHavingUnsavedChange = true"
                />
              </td>
            </tr>
            <tr>
              <td><label for="address">Address</label></td>
              <td>
                <input
                  type="text"
                  name="address"
                  id="address"
                  v-model="profile.address"
                  @change="isHavingUnsavedChange = true"
                />
              </td>
            </tr>
            <tr>
              <td><label for="bio">Bio</label></td>
              <td>
                <textarea
                  name="bio"
                  id="bio"
                  v-model="profile.bio"
                  @change="isHavingUnsavedChange = true"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section id="profile-edit-actions">
        <button @click="updateProfile">Save</button>
      </section>
    </main>
    <nav>
      <RouterLink to="/find-roommate">
        <span class="link-icon">🔎</span>
        <span>cari teman</span>
      </RouterLink>
      <RouterLink to="/chats">
        <span class="link-icon">🗨️</span>
        <span>chat</span>
      </RouterLink>
      <RouterLink to="/profile">
        <span class="link-icon">👤</span>
        <span>profil</span>
      </RouterLink>
      <RouterLink to="/logout">
        <span class="link-icon">❌</span>
        <span>logout</span>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.warning {
  background-color: rgb(250, 250, 0);
  color: black;
  padding: 0.5em;
  font-weight: bold;
}

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

main #profile {
  display: flex;
  flex-direction: column;
}

main #profile #profile_photo {
  align-self: center;
}

main #profile #change_profile_photo {
  width: 60%;
  align-self: center;
}

main #profile label {
  align-self: center;
}

nav {
  align-self: center;
  position: fixed;
  bottom: 0;
  padding-bottom: 2em;

  display: flex;
  gap: 0.3em;
}

nav a {
  background-color: rgb(36, 36, 36);
  width: 6em;
  height: 6em;
  border-radius: 10px;
  color: gray;
  font-size: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

nav a .link-icon {
  font-size: 24px;
}
</style>
