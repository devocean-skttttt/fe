import type { Metadata } from 'next';
import './globals.css';
import BottomNavigation from '@/components/BottomNavigation';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Filter Recipe',
  description: '보정 레시피 모아보기 사이트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ko">
      <body className="w-screen bg-slate-300 h-screen">
        <main className="max-w-mobile w-full h-full bg-white overflow-auto">
          <Header />
          {children}
          <BottomNavigation />
        </main>
      </body>
    </html>
  );
}
