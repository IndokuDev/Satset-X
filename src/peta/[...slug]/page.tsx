
interface Props {
  params: { slug: string[] };
}
const getShop = [
  {
    id: "1",
    title: "Shop Keren",
    description: "Ini adalah shop keren yang sangat nyaman digunakan.",
    images: [
      "/favicon.png",
    ], 
    items: [
      {
        id: "1",
        title: "Item Keren",
        description: "Ini adalah item keren yang sangat nyaman digunakan.",
        price: 1000000,
      },
      {
        id: "2",
        title: "Item Lainnya",
        description: "Ini adalah item lainnya yang sangat nyaman digunakan.",
        price: 1000000,
      },
      {
        id: "3",
        title: "Item Lainnya",
        description: "Ini adalah item lainnya yang sangat nyaman digunakan.",
        price: 1000000,
      },
    ],
  },
  {
    id: "2",
    title: "Shop Lainnya",
    description: "Ini adalah shop lainnya yang sangat nyaman digunakan.",
    images: [
      "/favicon.png",
    ],
    items: [
      {
        id: "1",
        title: "Item Keren",
        description: "Ini adalah item keren yang sangat nyaman digunakan.",
        price: 1000000,
      },
      {
        id: "2",
        title: "Item Lainnya",
        description: "Ini adalah item lainnya yang sangat nyaman digunakan.",
        price: 1000000,
      },
      {
        id: "3",
        title: "Item Lainnya",
        description: "Ini adalah item lainnya yang sangat nyaman digunakan.",
        price: 1000000,
      },
    ],
  },
];
export async function getMetadata({ params }: { params: { slug: string[] } }) {
  
  const slugPath = params.slug ? params.slug.join('/') : '';

  const shop = getShop.find((item) => item.id === slugPath);
  if (!shop) return { title: 'Not found' };
  return {
    title: shop.title,
    description: shop.description,
  };
}

export default function ShopPage({ params }: Props) {
  const slugPath = params.slug ? params.slug.join('/') : '';
  const shop = getShop.find((item) => item.id === slugPath);

  if (!shop) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-500">Not found</h1>
        <p>Item not found for <code>{slugPath}</code></p>
        <a href="/" className="text-blue-500 underline mt-4 block">Back home</a>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{shop.title}</h1>
      <p className="text-gray-600 mb-4">{shop.description}</p>
      {shop.images && shop.images.length > 0 && (
        <img src={shop.images[0]} alt={shop.title} className="max-w-md rounded shadow" />
      )}
      <div className="mt-8">
        <a href="/" className="text-blue-500 underline">Back home</a>
      </div>
    </div>
  );
}
