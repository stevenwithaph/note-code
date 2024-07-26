import './globals.css';

import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Note Code',
  description: 'Quickly share code snippets',
};

export default function RootLayout(props: PropsWithChildren) {
  return (
    //https://github.com/pacocoursey/next-themes/issues/224
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-zinc-300 dark:bg-zinc-900">
        <ThemeProvider attribute="class">{props.children}</ThemeProvider>
      </body>
    </html>
  );
}
