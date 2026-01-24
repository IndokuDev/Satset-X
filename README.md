# Satset Documentation App – metadata.lang & API Routes

Project ini adalah contoh aplikasi dokumentasi yang jalan di atas `satset-react`. Di sini sudah diatur SEO basic (title, description) dan bahasa dokumen lewat `metadata`/`getMetadata`, plus contoh API routes dengan `SatsetResponse`.

## 1. Menentukan bahasa dokumen dengan `metadata.lang`

Satset membaca `metadata` atau `getMetadata` dari setiap page. Field opsional `lang` akan dipakai untuk mengisi atribut:

```html
<html lang="...">
```

Ini berlaku di:
- Dev server (`npm run dev`)
- Build/production (`npm run build` + `npm start`)

### Pola umum

Di setiap file page, kamu bisa pakai salah satu:

```ts
// Versi async
export async function getMetadata() {
  return {
    lang: "id",
    title: "Judul Halaman",
    description: "Deskripsi halaman.",
  };
}
```

atau

```ts
// Versi sync
export const metadata = {
  lang: "id",
  title: "Judul Halaman",
  description: "Deskripsi halaman.",
};
```

### Implementasi yang sudah ada di project ini

Semua contoh di bawah sudah ada di repo dan langsung dipakai oleh Satset.

**Home**  
`documentation/src/page.tsx`

```ts
export async function getMetadata() {
  return {
    lang: "id",
    title: "Satset Documentation",
    description: "Documentation for the Satset project.",
  };
}
```

**Auth Login**  
`documentation/src/auth/login/page.tsx`

```ts
export async function getMetadata() {
  return {
    lang: "id",
    title: "Satset Login Simulation",
    description: "A simple login page simulation using Satset framework.",
  };
}
```

**Auth Register**  
`documentation/src/auth/register/page.tsx`

```ts
export async function getMetadata() {
  return {
    lang: "id",
    title: "Satset Register Simulation",
    description: "A simple register page simulation using Satset framework.",
  };
}
```

**Roadmap**  
`documentation/src/roadmap/page.tsx`

```ts
export async function getMetadata() {
  return {
    lang: "id",
    title: "Satset Roadmap",
    description: "Project roadmap for Satset.",
  };
}
```

### Cara cek `<html lang="id">` di browser

1. Jalankan dev server:

```bash
cd d:\MyProject\OngoingProjects\project-satset\documentation
npm install      # jalankan sekali sampai selesai
npm run dev
```

2. Buka salah satu URL:
   - http://localhost:3000/
   - http://localhost:3000/auth/login
   - http://localhost:3000/auth/register
   - http://localhost:3000/roadmap

3. Buka DevTools → tab Elements, cek elemen paling atas:

```html
<html lang="id">
```

Kalau nanti mau multi-bahasa, kamu bisa bikin `lang` dinamis, misalnya membaca dari `params` atau `query` di dalam `getMetadata`.

## 2. Contoh API route dengan `SatsetResponse`

API routes menggunakan konvensi folder `src/api` dan file `route.ts`, mirip Next.js. Satset memetakan:

- `src/api/auth/login/route.ts`    → `POST /api/auth/login`
- `src/api/auth/register/route.ts` → `POST /api/auth/register`

Untuk membangun respons, kita pakai `SatsetResponse` dari `satset-react`.

**Contoh: login route**  
`documentation/src/api/auth/login/route.ts`

```ts
import { SatsetResponse } from "satset-react";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return SatsetResponse.json(
      { message: "Username & password required" },
      { status: 400 }
    );
  }

  // Contoh logic: cek user di DB dan balikin token dummy
  const rows = await query("SELECT * FROM users WHERE username = $1 AND password = $2", [
    username,
    password,
  ]);

  if (!rows.length) {
    return SatsetResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  return SatsetResponse.json({
    message: "Login success",
    token: "dummy-token",
  });
}
```

**Contoh: register route**  
`documentation/src/api/auth/register/route.ts`

```ts
import { SatsetResponse } from "satset-react";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return SatsetResponse.json(
      { message: "Username & password required" },
      { status: 400 }
    );
  }

  try {
    await query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, password]
    );

    return SatsetResponse.json({ message: "Register success" });
  } catch (err: any) {
    if (err.code === "23505") {
      return SatsetResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    return SatsetResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
```

## 3. Ringkas: di mana naruh `metadata.lang`

- Untuk setiap halaman, tempatkan `metadata` atau `getMetadata` di file page tersebut:
  - Home: `src/page.tsx`
  - Auth login: `src/auth/login/page.tsx`
  - Auth register: `src/auth/register/page.tsx`
  - Roadmap: `src/roadmap/page.tsx`
- Field `lang` yang kamu isi di object metadata akan otomatis dipakai Satset sebagai nilai `lang` di tag `<html>` ketika SSR, baik di dev maupun production build.

