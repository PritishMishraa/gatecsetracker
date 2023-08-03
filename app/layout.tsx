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
        <meta property="og:url" content="https://gatecsetracker.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="GATE CSE Tracker" />
        <meta
          property="og:description"
          content="Track and Achieve Success in the GATE CSE Exam"
        />
        <meta
          property="og:image"
          content="https://i.postimg.cc/brn0WTcz/GCT-OG-Image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="gatecsetracker.vercel.app" />
        <meta
          property="twitter:url"
          content="https://gatecsetracker.vercel.app/"
        />
        <meta name="twitter:title" content="GATE CSE Tracker" />
        <meta
          name="twitter:description"
          content="Track and Achieve Success in the GATE CSE Exam"
        />
        <meta
          name="twitter:image"
          content="https://i.postimg.cc/brn0WTcz/GCT-OG-Image.png"
        />
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
