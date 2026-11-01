# webCV — CV & Portofolio Dinar Syahgita Sherani

Website CV/portofolio pribadi yang statis: dibuat dengan **HTML, CSS, dan JavaScript murni** — tanpa framework dan tanpa build step.

## Deskripsi

Halaman berisi: Hero, Tentang, Proyek (dengan filter kategori), Keahlian (bar animasi), Riwayat (pendidikan, pengalaman kerja, sertifikat), Development (alur Git & deploy), dan Kontak (form dengan validasi).

Fitur utama:

- HTML5 semantik (`header`, `nav`, `main`, `section`, `article`, `footer`), satu `h1`, heading berurutan
- Responsive (mobile & desktop) dengan flexbox + grid
- Mode gelap/terang — pilihan tersimpan di `localStorage`
- Animasi bar keahlian via `IntersectionObserver`
- Validasi form kontak (nama, email, pesan) dengan pesan error yang jelas
- Menghormati `prefers-reduced-motion`

## Teknologi

- HTML5 semantik
- CSS3 (custom properties, flexbox, grid, media query)
- JavaScript ES6 (DOM, Intersection Observer, Web Storage API)
- Google Fonts (satu-satunya dependensi eksternal)

## Cara Menjalankan

Cukup buka `index.html` di browser, atau lebih disarankan lewat server lokal:

```bash
# Python
python -m http.server 8000
# lalu buka http://localhost:8000

# atau Node (tanpa instalasi global)
npx serve
```

## Demo

🔗 **Live demo (GitHub Pages): <https://syahgita.github.io/webCV/>**

## Struktur Proyek

```
webCV/
├── index.html   # struktur halaman
├── style.css    # styling termasuk dark mode
├── script.js    # filter, tema, animasi bar, validasi form
├── README.md
└── .gitignore
```

## Deploy di GitHub Pages

1. Push repositori ke GitHub (branch `main`).
2. Buka **Settings → Pages**, pilih *Deploy from a branch* → **main** → **/ (root)** → **Save**.
3. Situs otomatis tersedia di `https://<username>.github.io/<repo>/` setelah build selesai.
