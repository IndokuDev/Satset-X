import { pool } from '@/lib/db';
import { comparePassword, signToken } from '@/lib/auth';
import { SatsetResponse } from 'satset-react';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return SatsetResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  const { rows } = await pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  );

  const user = rows[0];
  if (!user) return SatsetResponse.json({ error: 'Invalid' }, { status: 401 });

  const valid = await comparePassword(password, user.password);
  if (!valid) return SatsetResponse.json({ error: 'Invalid' }, { status: 401 });

  const token = signToken({ id: user.id });

  const res = SatsetResponse.json({ ok: true });
  res.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
  });

  return res;
}
