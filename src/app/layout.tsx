import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import PhoneFrame from "@/app/PhoneFrame";

export const metadata: Metadata = {
  title: "Filter Recipe",
  description: "보정 레시피 모아보기 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ko">
      <body>
        <PhoneFrame>
          <Header />
          <Navigation />
          {children}
          <BottomNavigation />
        </PhoneFrame>
      </body>
    </html>
  );
}
