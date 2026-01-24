import React from 'react';
import { getProductById } from '@/lib/data';

export async function getMetadata({ params }: { params: { slug: string } }) {
  const product = getProductById(params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.title,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = getProductById(slug);

  if (!product) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-500">Product Not Found</h1>
        <p>Could not find product with ID: <code>{slug}</code></p>
        <a href="/" className="text-blue-500 underline mt-4 block">Back to Home</a>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">Price: Rp {product.price.toLocaleString()}</p>
      {product.images && product.images.length > 0 && (
        <img src={product.images[0]} alt={product.title} className="max-w-md rounded shadow" />
      )}
      <div className="mt-8">
        <a href="/" className="text-blue-500 underline">Back to Home</a>
      </div>
    </div>
  );
}
