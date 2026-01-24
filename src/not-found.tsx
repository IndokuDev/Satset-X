import React from 'react';
import { Link } from 'satset-react';

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{ textAlign: 'center' }}
    >
      <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Waduh, Kesasar Bre!</h2>
      <p>Halamannya nggak ada di peta kita.</p>
      <Link href="/" className="mt-4 text-blue-500 underline">
        Balik ke Home aja kuy
      </Link>
    </div>
  );
}
