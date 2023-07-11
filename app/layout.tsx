import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GATE CSE Tracker",
  description: "Track and Achieve Success in the GATE CSE Exam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "73fa6f1bac1b4c22a158830005f40c56"}'
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
