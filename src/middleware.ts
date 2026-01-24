import { SatsetResponse } from 'satset-react';

export function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  console.log(`[Middleware] ${request.method} ${pathname}`);

  // Example: Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== 'Bearer secret-token') {
      return SatsetResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Example: Rewrite /old-shop to /shop
  if (pathname.startsWith('/old-shop')) {
    const newPath = pathname.replace('/old-shop', '/shop');
    return SatsetResponse.rewrite(newPath);
  }

  // Example: Add a custom header
  const response = SatsetResponse.next();
  response.headers['X-Custom-Header'] = 'Satset-Middleware';
  return response;
}
