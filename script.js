"use strict";

/* =======================================================
   INTERAKSI — CV & Portofolio Dinar Syahgita Sherani
   1. Filter proyek per kategori
   2. Toggle tema gelap/terang (localStorage, try/catch)
   3. Animasi bar keahlian (IntersectionObserver)
   4. Validasi form kontak
   ======================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- 1. FILTER PROYEK ---------------- */
  const filterButtons = document.querySelectorAll(".filter__btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const kategori = button.dataset.filter;

      // Perbarui status tombol (aria-pressed + kelas aktif)
      filterButtons.forEach((btn) => {
        const aktif = btn === button;
        btn.classList.toggle("is-active", aktif);
        btn.setAttribute("aria-pressed", String(aktif));
      });

      // Tampilkan/sembunyikan kartu sesuai kategori
      projectCards.forEach((card) => {
        const cocok = kategori === "semua" || card.dataset.kategori === kategori;
        card.hidden = !cocok;
      });
    });
  });

  /* ---------------- 2. TEMA GELAP/TERANG ---------------- */
  const themeButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-toggle-icon");

  const applyTheme = (theme) => {
    const pakaiGelap = theme === "dark";
    if (pakaiGelap) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    themeIcon.textContent = pakaiGelap ? "☀️" : "🌙";
    themeButton.setAttribute("aria-pressed", String(pakaiGelap));
  };

  // Tema awal: simpanan localStorage -> preferensi sistem -> terang
  let temaAwal = "light";
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    temaAwal = "dark";
  }
  try {
    const tersimpan = localStorage.getItem("tema");
    if (tersimpan === "dark" || tersimpan === "light") temaAwal = tersimpan;
  } catch (error) {
    // localStorage bisa diblokir (mode privat/kebijakan browser) -> lanjut tanpa persistensi
    console.warn("localStorage tidak tersedia:", error);
  }
  applyTheme(temaAwal);

  themeButton.addEventListener("click", () => {
    const berikutnya = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(berikutnya);
    try {
      localStorage.setItem("tema", berikutnya);
    } catch (error) {
      console.warn("Gagal menyimpan tema:", error);
    }
  });

  /* ---------------- 3. ANIMASI BAR KEAHLIAN ---------------- */
  const bars = document.querySelectorAll(".skill-bar__fill");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width + "%";
            observer.unobserve(entry.target); // cukup sekali
          }
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach((bar) => observer.observe(bar));
  } else {
    // Fallback: langsung isi tanpa animasi
    bars.forEach((bar) => {
      bar.style.width = bar.dataset.width + "%";
    });
  }

  /* ---------------- 4. VALIDASI FORM KONTAK ---------------- */
  const form = document.getElementById("form-kontak");
  const fields = {
    nama: document.getElementById("nama"),
    email: document.getElementById("email"),
    pesan: document.getElementById("pesan"),
  };
  const errors = {
    nama: document.getElementById("error-nama"),
    email: document.getElementById("error-email"),
    pesan: document.getElementById("error-pesan"),
  };
  const statusEl = document.getElementById("form-status");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validators = {
    nama: (v) => {
      if (!v.trim()) return "Nama tidak boleh kosong.";
      if (v.trim().length < 3) return "Nama minimal 3 karakter.";
      return "";
    },
    email: (v) => {
      if (!v.trim()) return "Email tidak boleh kosong.";
      if (!EMAIL_RE.test(v.trim())) return "Format email tidak valid, contoh: nama@email.com.";
      return "";
    },
    pesan: (v) => {
      if (!v.trim()) return "Pesan tidak boleh kosong.";
      if (v.trim().length < 10) return "Pesan minimal 10 karakter.";
      return "";
    },
  };

  const validateField = (key) => {
    const value = fields[key].value;
    const pesanError = validators[key](value);
    errors[key].textContent = pesanError;
    fields[key].setAttribute("aria-invalid", pesanError ? "true" : "false");
    return !pesanError;
  };

  Object.keys(fields).forEach((key) => {
    // Validasi saat pengguna keluar dari kolom (blur)
    fields[key].addEventListener("blur", () => validateField(key));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // situs statis: tidak ada pengiriman server

    const hasilValid = Object.keys(fields).map(validateField).every((ok) => ok);

    if (!hasilValid) {
      statusEl.textContent = "";
      // Fokus ke kolom pertama yang bermasalah agar ramah keyboard
      const pertama = Object.keys(fields).find((key) => fields[key].getAttribute("aria-invalid") === "true");
      if (pertama) fields[pertama].focus();
      return;
    }

    statusEl.textContent = "Terima kasih! Form ini statis, silakan kirim pesan Anda langsung ke syahgitadinar@gmail.com.";
    form.reset();
  });
});
