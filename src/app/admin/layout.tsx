import type { ReactNode } from "react";
import "../globals.css";

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50">{children}</body>
    </html>
  );
}
