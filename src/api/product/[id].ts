import { SatsetResponse } from 'satset-react';
import { getProductById } from '../../lib/db';

export async function GET({ params }: { params: { id: string } }) {
  const id = params?.id || '';
  const product = getProductById(id);
  if (!product) {
    return SatsetResponse.json({ ok: false, error: 'Product not found' }, { status: 404 });
  }
  return SatsetResponse.json({ ok: true, route: '/api/product/:id', params, product });
}
