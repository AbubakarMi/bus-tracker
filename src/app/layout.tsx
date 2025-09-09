import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { MotionProvider } from '@/components/motion-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'ADUSTECH Transport',
  description: 'A modern bus tracking and booking solution for ADUSTECH, Wudil.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <MotionProvider>{children}</MotionProvider>
        <Toaster />
      </body>
    </html>
  );
}
