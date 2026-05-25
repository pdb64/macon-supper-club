import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Macon Supper Club",
  description: "Chef-driven weekly suppers, private dining, and catered events in Middle Georgia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
