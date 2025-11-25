'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>!</div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#171717',
            margin: '0 0 0.5rem',
          }}>
            Error critico
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#555555',
            margin: '0 0 2rem',
            maxWidth: '400px',
          }}>
            Ha ocurrido un error inesperado. Por favor recarga la pagina.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#639605',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
