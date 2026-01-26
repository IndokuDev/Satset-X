You can mark the path "react" as external to exclude it from the bundle, which will remove this error and leave the unresolved path in the bundle.
You can mark the path "react-dom/client" as external to exclude it from the bundle, which will remove this error and leave the unresolved path in the bundle
You can mark the path "react/jsx-runtime" as external to exclude it from the bundle, which will remove this error and leave the unresolved path in the bundle.
KENAPA INI TERJADI (penting)
Di satset-react lo nulis:

"peerDependencies": {
  "react": ">=18",
  "react-dom": ">=18"
}


Itu SUDAH BENAR 👍
TAPI konsekuensinya:
satset-react TIDAK install React
→ yang WAJIB install React adalah PROJECT PENGGUNA
KENAPA DI LOCAL AMAN, DI VERCEL ERROR?
Biasanya karena:
di local lo udah npm install react react-dom
di repo Vercel:
❌ lupa install
❌ dependencies kosong
❌ React cuma ada di devDependency (kadang ke-skip)
CEK PERTAMA (WAJIB)
Di project yang di-deploy ke Vercel, pastiin:

{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "satset-react": "^0.3.0"
  }
}


⚠️ React HARUS di dependencies, BUKAN devDependencies
Karena:
Vercel install production deps only saat build
CEK KEDUA: esbuild lo terlalu niat
Dari log:
.satset/_entry.tsx
Ini artinya:
lo lagi bundling entry user
esbuild nyoba resolve react dari filesystem
tapi React nggak ketemu
SOLUSI TEPAT (framework-level)
Di bundler lo, mark react sebagai external
Contoh (esbuild):
esbuild.build({
  bundle: true,
  external: [
    'react',
    'react-dom',
    'react-dom/client'
  ]
})


Kenapa?
React itu runtime dependency
bukan sesuatu yang framework lo bundle ulang
sama kayak Vite / Next / Astro

👉 INI WAJIB buat framework

BEST PRACTICE BUAT SATSET (SARAN KERAS)
1️⃣ React = external (framework rule)

Di semua bundling client + server:
external: ['react', 'react-dom', 'react-dom/client']

2️⃣ Tetap peerDependencies (SUDAH BENER)
"peerDependencies": {
  "react": ">=18",
  "react-dom": ">=18"
}
3️⃣ Dokumentasi (penting)

Di README satset-react:
## Requirements
- react >= 18
- react-dom >= 18

KENAPA NEXT / VITE AMAN?

Karena mereka:
tidak membundle React
React selalu external
mereka cuma assume React ada di node_modules user

Lo sekarang lagi ngebangun framework beneran, dan ini exact problem yang semua framework hadapi di awal.

RINGKASAN FIX CEPAT

✅ Pastikan project user install:
npm install react react-dom
✅ React ada di dependencies
✅ esbuild → external: ['react', 'react-dom', 'react-dom/client']
❌ Jangan bundle React
harusnya gitu