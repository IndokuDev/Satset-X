import { Image } from 'satset-react';

export async function getMetadata() {
  return {
    title: "Sepatu Keren",
    description: "Ini adalah sepatu keren yang sangat nyaman digunakan.",
    openGraph: {
      title: "Sepatu Keren",
      description: "Ini adalah sepatu keren yang sangat nyaman digunakan.",
      images: [
        {
          url: "/favicon.png",
        },
      ],
    },
    twitter: {
      title: "Sepatu Keren",
      cardType: "summary_large_image",
      description: "Ini adalah sepatu keren yang sangat nyaman digunakan.",
      images: [
        {
          url: "/favicon.png",
        },
      ],
    },
    keywords: ["Sepatu", "Keren", "Nyaman"],
    robots: "index, follow",
    canonical: "/roadmap",
  };
}

export default function ProductPage() {

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Sepatu Keren</h1>
      <p className="text-gray-600 mb-4">Ini adalah sepatu keren yang sangat nyaman digunakan.</p>
      <p className="text-xl font-semibold mb-4">Price: Rp 25000</p>
        <Image src="/favicon.png" style={{width: "30px", height: "auto"}} alt="sepatu keren" className="max-w-md rounded shadow" />
      <div className="mt-8">
        <a href="/" className="text-blue-500 underline">Back to Home</a>
      </div>
    </div>
  );
}
