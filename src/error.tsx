'use client';

type SatsetError = {
  code?: number;
  message?: string;
} | Error;

export default function Error({ error, reset }: { error: SatsetError; reset: () => void }) {
  const code = (error as any)?.code;
  const message = (error as any)?.message || (error as Error)?.message || 'Terjadi kesalahan';

  return (
    <div style={{ padding: '1.25rem', background: '#fee2e2', color: '#991b1b' }}>
      <h2 style={{ fontWeight: 700 }}>Aduh, ada yang error di server!</h2>
      <p>
        {code ? `${code} - ${message}` : message}
      </p>
      <button
        onClick={() => reset?.()}
        style={{ marginTop: '0.75rem', padding: '0.5rem 1rem', background: '#ef4444', color: 'white', borderRadius: 6 }}
      >
        Coba Lagi
      </button>
    </div>
  );
}
