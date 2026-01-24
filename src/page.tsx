"use client"
import { useEffect, useState } from 'react';
export async function getMetadata() {
  return {
    lang: "id",
    title: "Satset Documentation",
    description: "Documentation for the Satset project.",
  };
}
export default function Home() {const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={theme === "dark" ? "bg-black text-white p-8" : "bg-white text-black p-8"}>
      <h1 className="text-3xl font-bold mb-4">Satset Documentation & Demo</h1>
      <p className="mb-4">Welcome to the docs. This page demonstrates the features of Satset Engine.</p>
      
      <button onClick={toggleTheme} className="px-4 py-2 bg-blue-500 text-white rounded mb-8">
        Toggle Theme ({theme})
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Feature Demos</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Pages & Routing:</strong>
              <ul className="list-circle pl-5 mt-1">
                <li><a href="/shop/awesome-product" className="text-blue-500 underline">Dynamic Route (/shop/[slug])</a></li>
                <li><a href="/peta/jakarta/selatan/blok-m" className="text-blue-500 underline">Catch-all Route (/peta/[...slug])</a></li>
              </ul>
            </li>
            <li>
              <strong>API Routes:</strong>
              <ul className="list-circle pl-5 mt-1">
                <li><a href="/api/env" target="_blank" className="text-blue-500 underline">Environment Variables API (/api/env)</a></li>
                <li><a href="/api/user/123" target="_blank" className="text-blue-500 underline">Dynamic API (/api/user/[id])</a></li>
              </ul>
            </li>
            <li>
              <strong>Middleware:</strong>
              <ul className="list-circle pl-5 mt-1">
                <li><a href="/admin" className="text-blue-500 underline">Protected Route (/admin) - Expect 401</a></li>
                <li><a href="/old-shop/product" className="text-blue-500 underline">Rewrite (/old-shop to /shop)</a></li>
              </ul>
            </li>
            <li>
              <strong>Authentication:</strong>
              <ul className="list-circle pl-5 mt-1">
                <li><a href="/auth/login" className="text-blue-500 underline">Login Page</a></li>
                <li><a href="/auth/register" className="text-blue-500 underline">Register Page</a></li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">System Info</h2>
          <p>Environment: <code>{process.env.NODE_ENV}</code></p>
          <p>Site URL: <code>{process.env.SATSET_PUBLIC_SITE_URL || 'Not set'}</code></p>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded">
            <p className="text-sm">Check the console for middleware logs!</p>
          </div>
        </section>
      </div>
    </div>
  );
}
