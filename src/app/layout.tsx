import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PokéAPI Hooks Demo - React & Next.js',
  description: 'Proyecto demostrativo para aprender useState y useEffect integrando PokéAPI en React y Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
