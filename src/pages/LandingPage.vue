<template>
  <div class="landing-page">
    <header class="topbar">
      <span class="logo">Aligned Living</span>

      <div class="actions">
        <RouterLink to="/login">
          <Button label="Log In" text />
        </RouterLink>

        <RouterLink to="/signup">
          <Button label="Get Started" />
        </RouterLink>
      </div>
    </header>

    <div class="landing-container">
      <Card class="landing-card">
        <template #content>
          <section class="hero">
            <img
              src="../illustrations/roommate.png"
              alt="Lifestyle-based roommate matching"
              class="illustration"
            />
  
            <h1 class="brand">Find a roommate who aligns with your lifestyle.</h1>
  
            <h4 class="subtitle">
              Thoughtfully matched co-living for professionals and students who
              value compatibility, cleanliness, and culture.
            </h4>
  
            <p class="description">
              Aligned Living connects individuals based on daily habits,
              communication style, values, and living standards — because sharing
              a home should feel effortless.
            </p>
  
            <div class="cards flex">
              <div class="stat">
                <strong>Curated</strong>
                <span>member profiles</span>
              </div>
              <div class="stat">
                <strong>Lifestyle</strong>
                <span>compatibility matching</span>
              </div>
              <div class="stat">
                <strong>Verified</strong>
                <span>identity screening</span>
              </div>
            </div>
  
            <RouterLink to="/find-roommate">
              <Button
                label="Explore Matches"
                icon="pi pi-search"
                class="w-full mt-3"
                size="large"
              />
            </RouterLink>
  
            <RouterLink to="/signup" class="secondary-cta">
              Join a community that values intentional living
            </RouterLink>
          </section>
        </template>
      </Card>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <h3>Aligned Living</h3>
          <p>
            A modern platform for intentional co-living and refined lifestyle
            matching.
          </p>
        </div>

        <div class="footer-links">
          <div class="footer-column">
            <h4>Company</h4>
            <RouterLink to="/about">About Us</RouterLink>
            <RouterLink to="/careers">Careers</RouterLink>
            <RouterLink to="/press">Press</RouterLink>
          </div>

          <div class="footer-column">
            <h4>Support</h4>
            <RouterLink to="/help">Help Center</RouterLink>
            <RouterLink to="/contact">Contact</RouterLink>
            <RouterLink to="/report">Report a Concern</RouterLink>
          </div>

          <div class="footer-column">
            <h4>Legal</h4>
            <RouterLink to="/privacy">Privacy Policy</RouterLink>
            <RouterLink to="/terms">Terms of Service</RouterLink>
            <RouterLink to="/guidelines">Community Guidelines</RouterLink>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 Aligned Living. All rights reserved.</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* =========================
   Layout
========================= */

.landing-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--surface-ground);
}

/* =========================
   Topbar
========================= */

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 6%;
  background: var(--surface-card);
  border-bottom: 1px solid var(--surface-border);
}

.logo {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
  letter-spacing: 0.5px;
}

.actions {
  display: flex;
  gap: 0.75rem;
}

/* =========================
   Card Adjustment
========================= */

.landing-container {
  width: 100%;
  max-width: 1100px;
  margin: 3rem auto;
  padding: 0 1.5rem;
}

.landing-card {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.landing-card .p-card-body {
  padding: 0 !important;
}

/* =========================
   Hero Section
========================= */

.hero {
  text-align: center;
  padding: 3rem 1.5rem;
}

.illustration {
  max-width: 300px;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.brand {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--text-color-secondary);
  max-width: 700px;
  margin: 0 auto 1.25rem auto;
}

.description {
  font-size: 0.95rem;
  color: var(--text-color-secondary);
  max-width: 620px;
  margin: 0 auto 2.5rem auto;
  line-height: 1.6;
}

/* =========================
   Stats Section
========================= */

.cards {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat strong {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.25rem;
}

.stat span {
  font-size: 0.85rem;
  color: var(--text-color-secondary);
}

/* =========================
   Button Refinement (Non-destructive)
========================= */

.p-button {
  border-radius: 8px;
}

.p-button:hover {
  transform: translateY(-1px);
  transition: transform 0.15s ease;
}

/* =========================
   Secondary CTA
========================= */

.secondary-cta {
  display: inline-block;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--primary-color);
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.secondary-cta:hover {
  opacity: 1;
}

/* =========================
   Footer
========================= */

.footer {
  margin-top: auto;
  background: var(--surface-card);
  border-top: 1px solid var(--surface-border);
  padding: 3rem 6% 2rem 6%;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-brand {
  max-width: 320px;
}

.footer-brand h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.75rem;
}

.footer-brand p {
  font-size: 0.85rem;
  color: var(--text-color-secondary);
  line-height: 1.6;
}

.footer-links {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-column h4 {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.footer-column a {
  font-size: 0.8rem;
  color: var(--text-color-secondary);
  transition: color 0.2s ease;
}

.footer-column a:hover {
  color: var(--text-color);
}

.footer-bottom {
  border-top: 1px solid var(--surface-border);
  padding-top: 1.25rem;
  font-size: 0.75rem;
  color: var(--text-color-secondary);
  text-align: center;
}

/* =========================
   Responsive
========================= */

@media (max-width: 768px) {
  .brand {
    font-size: 2rem;
  }

  .cards {
    gap: 1.5rem;
  }

  .footer-content {
    flex-direction: column;
  }
}
</style>
