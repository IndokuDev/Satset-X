Ringkas: Dynamic routes ala Next.js (Next App Router style) tanpa Next — didukung di Satset.
⚪️ *Jenjang SMA/SMK/MA/Sederajat*

1. AKUNTANSI
https://forms.gle/NqtCtgc6Ceq5XAft7

2. BAHASA INDONESIA
https://forms.gle/C2R73KQG7dKFh8qT7

3. BAHASA INGGRIS
https://forms.gle/NgAKgPN5GBgoxBrQ9

4. BIOLOGI
https://forms.gle/6L1B3gNmFTpKmces6

5. EKONOMI
https://forms.gle/NGQcA3HGyTkJEuCj6

6. FISIKA
https://forms.gle/563o6YwQdpnSuAbo9

7. KEDOKTERAN
https://forms.gle/kXT17rrT1L8nGQkh7

8. KIMIA
https://forms.gle/iz6crN4zbku1BRs3A

9. MATEMATIKA
https://forms.gle/bb5GDJ6ZDnuJjNdj8

10. PENGETAHUAN UMUM
https://forms.gle/xTKayMZ4f2MM4T6v5

11. PPKN/WAWASAN KEBANGSAAN
https://forms.gle/tKHKn5pwSygNYsAd6

Cara pakai (App Router):

- Buat folder: `src/product/[id]/page.tsx`
- Di dalam `page` komponen, terima `params` props atau gunakan `useParams()` jika di client

Contoh (TypeScript):

```tsx
export default function Page({ params }: { params: { id: string } }) {
  return <h1>Produk: {params.id}</h1>
}
```

Contoh (Catch-all): buat folder `src/app/shop/[...slug]/page.tsx`, akses URL `/shop/baju/pria/merah` => `slug` jadi `"baju/pria/merah"`.

Pages Router (file-based):

- Buat file `src/pages/product/[id].js` atau `.jsx` atau `.ts` / `.tsx`.
- Komponen tersebut akan menerima `params` saat SSR, dan di client tersedia `window.__SATSET_PARAMS__`.

Jenis dynamic route yang didukung:

- Basic: `[id]` -> `/product/1` => `{ id: '1' }`
- Catch-all: `[...slug]` -> `/shop/baju/pria` => `{ slug: 'baju/pria' }`
- Optional catch-all: `[[...slug]]` -> `/shop` atau `/shop/a/b` => `{ slug: '' }` atau `{ slug: 'a/b' }`

Implementasi teknis:

- Build/Dev server sekarang melakukan "pattern matching" untuk path seperti `/:id` dan `/*slug`.
- Client bundle hydrates matching page and exposes `window.__SATSET_ROUTES__` and `window.__SATSET_PARAMS__`.
- `Router` (hook `useParams`) now reads pathname and the exposed routes to populate params.

Tips:

- Komponen bisa menerima `params` props saat SSR. Di client, pakai `useParams()` untuk membaca params saat navigasi SPA.
- Dukungan untuk berkas `.js/.jsx/.ts/.tsx` sudah disediakan.
