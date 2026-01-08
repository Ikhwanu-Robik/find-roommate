<script setup>
import IconDocumentation from "@/components/icons/IconDocumentation.vue";
</script>

<template>
  <div id="container">
    <header>
      <h4>cari teman untuk</h4>
      <h1>BagiSewa</h1>
      <h4>kos dan kontrakan</h4>
    </header>
    <main>
      <p>
        <i>In this economy</i> siapa sih yang bisa <i>afford</i>
        kos sama kontrakan sendirian?
      </p>
      <button>Cari Teman</button>
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
