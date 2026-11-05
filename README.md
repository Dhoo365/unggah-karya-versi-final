# My Project

Monorepo berisi tiga aplikasi dalam satu folder:

| Aplikasi | Teknologi | Port | Folder |
|---|---|---|---|
| Website | React + Tailwind CSS (Vite) | 5173 | `apps/web` |
| Mobile | Ionic + Vue (Vite + Capacitor) | 8100 | `apps/mobile` |
| Backend | Node.js + Express | 3000 | `apps/api` |

## Cara menjalankan

Butuh **Node.js 20+**.

```bash
npm install          # sekali saja, install semua aplikasi sekaligus
npm run dev          # jalankan api + web + mobile bersamaan
```

Atau satu per satu: `npm run dev:api`, `npm run dev:web`, `npm run dev:mobile`.

Buka:
- Website: http://localhost:5173
- Mobile (di browser): http://localhost:8100
- API: http://localhost:3000/api/health

## Struktur folder

```
my-project/
├── package.json          # skrip & workspace untuk semua aplikasi
├── apps/
│   ├── api/              # BACKEND Express
│   │   ├── .env          # konfigurasi (port, CORS) – jangan di-commit
│   │   └── src/
│   │       ├── index.js        # titik awal, menyalakan server
│   │       ├── app.js          # setup Express (cors, json, routes)
│   │       ├── config/         # baca variabel .env
│   │       ├── routes/         # daftar URL endpoint (/api/...)
│   │       ├── controllers/    # logika tiap endpoint
│   │       └── middlewares/    # penanganan error, auth, dll.
│   │
│   ├── web/              # WEBSITE React + Tailwind
│   │   ├── index.html
│   │   ├── vite.config.js      # plugin React, Tailwind, proxy /api
│   │   └── src/
│   │       ├── main.jsx        # titik awal React + router
│   │       ├── App.jsx         # layout & daftar halaman
│   │       ├── index.css       # import Tailwind
│   │       ├── pages/          # satu file = satu halaman
│   │       ├── components/     # potongan UI yang dipakai ulang
│   │       ├── hooks/          # logika React yang dipakai ulang
│   │       ├── services/       # semua panggilan ke API
│   │       └── assets/         # gambar, ikon, font
│   │
│   └── mobile/           # APLIKASI MOBILE Ionic + Vue
│       ├── capacitor.config.json  # id & nama app Android/iOS
│       ├── vite.config.js
│       └── src/
│           ├── main.js         # titik awal Vue + Ionic
│           ├── App.vue         # wadah utama (ion-app)
│           ├── router/         # daftar halaman
│           ├── views/          # satu file = satu halaman
│           ├── components/     # potongan UI yang dipakai ulang
│           ├── services/       # semua panggilan ke API
│           └── theme/          # warna tema Ionic
│
└── packages/
    └── shared/           # kode yang dipakai bersama (konstanta, URL API)
```

## Alur menambah fitur

1. **API**: buat controller di `controllers/`, daftarkan di `routes/`.
2. **Web**: tambah fungsi di `services/api.js`, buat halaman di `pages/`, daftarkan di `App.jsx`.
3. **Mobile**: tambah fungsi di `services/api.js`, buat halaman di `views/`, daftarkan di `router/index.js`.
4. Nama URL endpoint taruh di `packages/shared/src/index.js` agar ketiganya konsisten.

## Build ke Android / iOS

```bash
cd apps/mobile
npm run build
npx cap add android      # atau: npx cap add ios (butuh Mac)
npx cap sync
npx cap open android     # buka di Android Studio
```

Saat dijalankan di HP sungguhan, `localhost` mengarah ke HP itu sendiri. Salin
`apps/mobile/.env.example` jadi `.env` lalu isi `VITE_API_URL` dengan IP laptop
kamu, misalnya `http://192.168.1.10:3000`.
# unggah-karya-versi-final
