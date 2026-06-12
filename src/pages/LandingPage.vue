<template>
  <div class="landing-page">
    <!-- Top App Bar -->
    <header class="topbar">
      <div class="links">
        <RouterLink to="/">
          <Button class="logo" label="BagiSewa" text />
        </RouterLink>
        <RouterLink to="/login">
          <Button label="What is BagiSewa?" text /> </RouterLink
        ><RouterLink to="/login"> <Button label="People We Have Helped" text /> </RouterLink
        ><RouterLink to="/login">
          <Button label="I'm a Landlord" text />
        </RouterLink>
      </div>

      <div class="actions">
        <RouterLink to="/login">
          <Button label="Login" text class="login-link" />
        </RouterLink>

        <RouterLink to="/signup">
          <Button label="Signup" />
        </RouterLink>
      </div>
    </header>

    <!-- Hero Card -->
    <section class="hero">
      <!-- Illustration -->
      <div class="left">
        <div class="header">
          <h4 class="subtitle">cari teman untuk</h4>
          <h1 class="brand">BagiSewa</h1>
          <h4 class="subtitle">kos dan kontrakan</h4>
          <p class="description">
            <i>In this economy</i> siapa sih yang bisa <i>afford</i>
            kos yang bagus sendirian?
          </p>
        </div>

        <!-- Stats -->
        <div class="stats">
          <div class="stat">
            <strong>50%</strong>
            <span>lebih hemat</span>
          </div>
          <div class="stat">
            <strong>100+</strong>
            <span>teman sewa</span>
          </div>
          <div class="stat">
            <strong>Aman</strong>
            <span>profil terverifikasi</span>
          </div>
        </div>

        <div class="call-to-actions">
          <!-- CTA -->
          <RouterLink to="/find-roommate">
            <Button
              label="Cari Teman"
              icon="pi pi-search"
              class="w-full mt-3"
              size="large"
            />
          </RouterLink>

        </div>
      </div>

      <div class="right">
        <img
          src="../../screenshots/triple-screenshots.png"
          alt="Find roommate"
          class="illustration"
        />
      </div>
    </section>
  </div>

</template>

<style scoped>
.landing-page { 
  min-height: 100vh;
  background: var(--surface-ground);
  display: flex;
  flex-direction: column;
}

/* Top App Bar */
.topbar {
  position: absolute;
  width: 100svw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.links {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 4rem;
}

.logo {
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.login-link {
  border: 1px solid rgb(57, 57, 57);
}

/* Hero */
.hero {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.5rem;
  height: 100svh;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 3rem;  
}

.illustration {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.subtitle {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-color-secondary);
}

.brand {
  margin: 0;
  font-size: 5rem;
}

.description {
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Stats */
.stats {
  display: flex;
  justify-content: space-around;
  margin: 0.5rem 0;
}

.stat {
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  color: var(--text-color-secondary);
}

.stat strong {
  font-size: 1rem;
  color: var(--text-color);
}

.call-to-actions {
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>
