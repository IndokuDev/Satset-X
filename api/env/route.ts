import { SatsetResponse } from 'satset-react';

export async function GET(request: Request) {
  return SatsetResponse.json({
    message: "Environment Variables Demo",
    siteUrl: process.env.SATSET_PUBLIC_SITE_URL,
    hasDatabaseUrl: !!process.env.SATSET_DATABASE_URL,
    jwtSecretMasked: process.env.SATSET_JWT_SECRET ? '***' : 'missing'
  });
}
