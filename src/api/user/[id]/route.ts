import { SatsetResponse } from 'satset-react';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  return SatsetResponse.json({
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
    role: id === '1' ? 'admin' : 'user'
  });
}
