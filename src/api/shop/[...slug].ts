import { SatsetResponse } from 'satset-react';
import { findShopByPath } from '../../lib/db';

export async function GET({ params }: { params: { slug?: string } }) {
  const slug = params?.slug || '';
  const shop = findShopByPath(slug);
  if (!shop) {
    return SatsetResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }
  return SatsetResponse.json({ ok: true, route: '/api/shop/*slug', params, shop });
}
