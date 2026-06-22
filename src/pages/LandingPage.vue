<template>
  <div class="landing-page">
    <!-- Top App Bar -->
    <header class="topbar">
      <div class="links">
        <RouterLink to="/">
          <Button class="logo" label="BagiSewa" text />
        </RouterLink>
        <RouterLink to="/#what-is-bagisewa" class="section-link">
          <Button label="What is BagiSewa?" text /> </RouterLink
        ><RouterLink to="/#people-we-have-helped" class="section-link">
          <Button label="People We Have Helped" text /> </RouterLink
        ><RouterLink to="/#im-a-landlord" class="section-link">
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

    <div class="what-is-bagisewa" id="what-is-bagisewa">
      <div class="header">
        <h2 class="brand">What is BagiSewa?</h2>
      </div>
      <Card class="description">
        <template #content>
          Bayangkan kos impianmu,
          <br />
          besar kemungkinan mahal.
          <br />
          Salah satu cara untuk tetap bisa tinggal di sana?
          <br />
          Bagi sewa.

          <br />
          <br />

          Untuk itu, kamu bisa cari teman sewa di <a href="">BagiSewa</a>
          supaya temen kos kamu sefrekuensi sama kamu.

          <br />
          <br />

          Jadi sama-sama asik kan?
        </template>
      </Card>
    </div>

    <div class="testimonials-container" id="people-we-have-helped">
      <h2>People We Have Helped</h2>
      <Card class="testimonial-cards">
        <template #content>
          <div class="testimonial-cards-container">
            <Card>
              <template #content>
                <div class="testimonial">
                  <div class="testimonial-text">
                    "Dulu nyari teman kos lewat grup Facebook susah banget
                    banyak yang nggak balas. Lewat aplikasi ini saya dapat
                    roommate dalam 4 hari.. Orangnya juga sesuai dengan
                    preferensi yang saya cari."
                  </div>
                  <div class="person-star-container">
                    <div class="testimonial-star">
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                    </div>
                    <div class="testimonial-person">Andi, Mahasiswa</div>
                  </div>
                </div>
              </template>
            </Card>
            <Card>
              <template #content>
                <div class="testimonial">
                  <div class="testimonial-text">
                    "Fitur filternya membantu karena saya bisa cari roommate
                    sesama perempuan dan non-perokok. Semoga ke depannya ada
                    lebih banyak pengguna di kota-kota kecil."
                  </div>
                  <div class="person-star-container">
                    <div class="testimonial-star">
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                    </div>
                    <div class="testimonial-person">Siti</div>
                  </div>
                </div>
              </template>
            </Card>
            <Card>
              <template #content>
                <div class="testimonial">
                  <div class="testimonial-text">
                    "Sempat ragu karena belum pernah cari roommate secara
                    online, tapi ternyata prosesnya cukup mudah. Sekarang sudah
                    3 bulan tinggal bareng rommate yang saya temukan di sini."
                  </div>
                  <div class="person-star-container">
                    <div class="testimonial-star">
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                    </div>
                    <div class="testimonial-person">Dimas</div>
                  </div>
                </div>
              </template>
            </Card>
            <Card>
              <template #content>
                <div class="testimonial">
                  <div class="testimonial-text">
                    "UI-nya sederhana dan gampang dipahami. Saya suka karena
                    profil pengguna cukup lengkap jadi bisa tahu kecocokan
                    sebelum chat."
                  </div>
                  <div class="person-star-container">
                    <div class="testimonial-star">
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                    </div>
                    <div class="testimonial-person">Fajar</div>
                  </div>
                </div>
              </template>
            </Card>
            <Card>
              <template #content>
                <div class="testimonial">
                  <div class="testimonial-text">
                    "Sebagai mahasiswi perantauan, aplikasi ini sangat membantu.
                    Saya tidak punya banyak kenalan di kota tujuan, jadi fitur
                    pencarian roommate benar-benar berguna."
                  </div>
                  <div class="person-star-container">
                    <div class="testimonial-star">
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                      <img src="../assets/star-white.svg" alt="star" />
                    </div>
                    <div class="testimonial-person">Nabila</div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </template>
      </Card>
    </div>

    <div class="landlord-form-container" id="im-a-landlord">
      <h2>I'm A Landlord</h2>
      <Card class="landlord-form">
        <template #content>
          <div class="landlord-form-card">
            <div class="welcome-text">
              Kamu pemilik kos, mau cari penghuni kos yang nggak bermasalah? We
              got you!

              <br />
              <br />

              Dengan sefrekuensinya orang-orang yang masuk ke kos kamu, maka
              akan lebih merasa "memiliki" kos kamu, sehingga fasilitas aman,
              masalah minim.

              <br /><br />

              Belum yakin? Kamu bisa deskripsikan tipikal orang seperti apa yang
              kamu mau, nanti BagiSewa filterin!
            </div>
            <div class="form">
              <h3>Form Pendaftaran Kos</h3>
              <form action="">
                <label for="">Nama Kos</label>
                <input type="text" />
                <label for="">Pemilik</label>
                <input type="text" />
                <label for="">Alamat</label>
                <input type="text" />
                <label for="">Link Google Maps</label>
                <input type="text" />
                <label for="">Telepon</label>
                <input type="text" />
                <button type="submit">Daftarkan</button>
              </form>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Top App Bar */
.topbar {
  position: absolute;
  width: 95svw;
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

.what-is-bagisewa {
  height: 100svh;
  width: 95svw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.what-is-bagisewa .header,
.what-is-bagisewa .description {
  width: 40%;
}

.what-is-bagisewa .description {
  height: 60%;
  padding: 2rem;
}

.testimonials-container {
  height: 100svh;
  width: 95svw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.testimonial-cards {
  width: 90%;
  height: 70%;
}

.testimonial-cards-container {
  display: flex;
  gap: 1rem;
}

.testimonial {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.testimonial .testimonial-star {
  display: flex;
  height: 2rem;
}

.landlord-form-container {
  height: 100svh;
  width: 95svw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.landlord-form {
  width: 90%;
  height: 70%;
}

.landlord-form-card {
  display: flex;
  justify-content: space-around;
}

.landlord-form-card .welcome-text,
.landlord-form-card .form {
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
}

.landlord-form-card .form form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

@media screen and (max-width: 700px) {
  .links .section-link {
    display: none;
  }

  .hero {
    flex-direction: column-reverse;
    justify-content: center;
    padding-left: 2rem;
  }

  .illustration {
    width: 70%;
  }

  .brand {
    font-size: 4rem;
  }

  .subtitle {
    font-size: 1.5rem;
  }

  .what-is-bagisewa {
    flex-direction: column;
    gap: 1rem;
  }

  .what-is-bagisewa .header,
  .what-is-bagisewa .description {
    width: 90%;
  }

  .testimonials-container {
    height: auto;
  }

  .testimonial-cards {
    height: fit-content;
  }

  .testimonial-cards-container {
    flex-direction: column;
  }

  .landlord-form {
    height: fit-content;
  }

  .landlord-form-card {
    flex-direction: column;
  }

  .landlord-form-card .welcome-text, .landlord-form-card .form {
    width: auto;
  }
}
</style>
