import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roadmap Checker - エンジニア学習ロードマップ",
  description: "未経験からフルスタックエンジニアを目指すための進捗管理ツール。学習の進捗を可視化し、ポートフォリオ作成を支援します。",
  openGraph: {
    title: "Roadmap Checker - エンジニア学習ロードマップ",
    description: "未経験からフルスタックエンジニアを目指すための進捗管理ツール",
    url: "https://roadmap-checker.vercel.app", // Placeholder URL
    siteName: "Roadmap Checker",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roadmap Checker - エンジニア学習ロードマップ",
    description: "未経験からフルスタックエンジニアを目指すための進捗管理ツール",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
