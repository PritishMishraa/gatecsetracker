import "./globals.css";
import { DM_Mono, DM_Sans, Inter } from "next/font/google";
import localFont from "next/font/local";
import { LayoutContent } from "@/components/LayoutContent";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});
const instrumentSerif = localFont({
  src: [
    {
      path: "../public/fonts/Instrument_Serif/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-instrument-serif",
});

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
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="8f32dfb2-00bc-4a24-8d11-36e1b5eb9fd3"
          async
        ></script>
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
      <body
        className={[
          inter.className,
          dmSans.variable,
          dmMono.variable,
          instrumentSerif.variable,
        ].join(" ")}
      >
        <TooltipProvider>
          <LayoutContent>{children}</LayoutContent>
        </TooltipProvider>
      </body>
    </html>
  );
}
