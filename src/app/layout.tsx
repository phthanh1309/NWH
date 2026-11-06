import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";

import "@/styles/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nova Wave Hub",
  description:
    "Nền tảng đọc truyện cộng đồng dành cho độc giả Việt Nam.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
