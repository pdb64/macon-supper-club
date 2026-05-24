import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Macon Supper Club",
  description: "Weekly Sunday suppers by Chef David Bartlett in Macon, Georgia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

