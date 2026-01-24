import db from "./db.json";

export function getProductById(id: string) {
  return db.products.find((product) => product.id === id);
}

export function findShopByPath(path: string) {
  return db.shops.find((shop) => shop.path === path);
}
