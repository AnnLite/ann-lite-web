import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Ann Lite",
  description: "Announcements, prayer, reflections, and giving for Ann Lite.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
