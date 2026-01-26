const getProduct = [
  {
    id: "1",
    title: "Sepatu Keren",
    description: "Ini adalah sepatu keren yang sangat nyaman digunakan.",
    price: 1000000,
    images: [
      "/favicon.png",
    ],
  },
  {
    id: "2",
    title: "Sepatu Lainnya",
    description: "Ini adalah sepatu lainnya yang sangat nyaman digunakan.",
    price: 2000000,
    images: [
      "/favicon.png",
    ],
  },
];

export async function getMetadata({ params }: { params: { slug: string } }) {

  const product = getProduct.find((item) => item.id === params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.title,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = getProduct.find((item) => item.id === slug);

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
