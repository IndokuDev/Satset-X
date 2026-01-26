import React from 'react';
import { Link } from 'satset-react';
import { Button } from '@chakra-ui/react';
export async function getMetadata() {
  return {
    title: "404 | Not Found",
    description: "404 Not Found - Page not found",
  };
}
export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{ textAlign: 'center' }}
    >
      <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Waduh, Kesasar Bre!</h2>
      <p>Halamannya nggak ada di peta kita.</p>
      <Button asChild>
        <Link href="/">Balik ke Home aja kuy</Link>
      </Button>
    </div>
  );
}
