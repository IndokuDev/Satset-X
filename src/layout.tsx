import React from 'react';
import { Provider } from '@/components/ui/provider';
import { Button } from '@chakra-ui/react';

export async function getMetadata() {
  return {
    title: "Satset Documentation",
    description: "Documentation for the Satset project.",
  };
}
export default function RootLayout({ children, locale = 'en-US' }: { children: React.ReactNode, locale?: string }) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Provider>
          <Button>Hello</Button>
          <header className="site-header">
            <div className="container">
              <h1 className="brand"><a href="/">Satset Docs</a></h1>
              <nav>
                <Button size="xs" href="/">Home</Button>
                <a href="/roadmap">Roadmap</a>
                <a href="/product/sepatu-keren">Sample Product</a>
              </nav>
            </div>
          </header>
          <main className="container content">{children}</main>
          <footer className="site-footer">
            <div className="container">Built with ❤️ Satset</div>
          </footer>
        </Provider>
      </body>
    </html>
  );
}
