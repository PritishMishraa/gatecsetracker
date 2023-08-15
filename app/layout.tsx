import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Announcment from "@/components/Announcment";

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
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "ifk1t3e1jr");
              `,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Announcment />
          <div className="flex-1">{children}</div>
          <div className="h-px bg-secondary w-full mt-20"></div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
