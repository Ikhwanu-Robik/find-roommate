<template>
  <div class="landing-page">
    <!-- Top App Bar -->
    <header class="topbar">
      <span class="logo">BagiSewa</span>

      <div class="actions">
        <RouterLink to="/login">
          <Button label="Login" text />
        </RouterLink>

        <RouterLink to="/signup">
          <Button label="Signup" />
        </RouterLink>
      </div>
    </header>

    <!-- Hero Card -->
    <Card class="landing-card">
      <template #content>
        <section class="hero">
          <!-- Illustration -->
          <img
            src="../illustrations/roommate.png"
            alt="Find roommate"
            class="illustration"
          />

          <h4 class="subtitle">cari teman untuk</h4>
          <h1 class="brand">BagiSewa</h1>
          <h4 class="subtitle">kos dan kontrakan</h4>

          <p class="description">
            <i>In this economy</i> siapa sih yang bisa <i>afford</i>
            kos sama kontrakan sendirian?
          </p>

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

          <!-- CTA -->
          <RouterLink to="/find-roommate">
            <Button
              label="Cari Teman"
              icon="pi pi-search"
              class="w-full mt-3"
              size="large"
            />
          </RouterLink>

          <RouterLink to="/signup" class="secondary-cta">
            Baru di sini? Daftar sekarang
          </RouterLink>
        </section>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: var(--surface-ground);
}

/* Top App Bar */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.logo {
  font-weight: 700;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

/* Card */
.landing-card {
  margin: 1rem;
  text-align: center;
}

/* Hero */
.hero {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.illustration {
  width: 100%;
  max-width: 220px;
  margin: 0 auto;
}

.subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-color-secondary);
}

.brand {
  margin: 0;
  font-size: 2.2rem;
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

/* Secondary CTA */
.secondary-cta {
  font-size: 0.85rem;
  color: var(--primary-color);
  text-decoration: none;
}
</style>
