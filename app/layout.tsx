import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Job Tracker',
  description: 'Suivez vos candidatures professionnelles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
