/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: '/request',
        destination: '/request/index.html',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/subject/Discrete Mathematics",
        destination: "/subject/discrete-mathematics",
        permanent: true,
      },
      {
        source: "/subject/Discrete%20Mathematics",
        destination: "/subject/discrete-mathematics",
        permanent: true,
      },

      {
        source: "/subject/Theory of Computation",
        destination: "/subject/theory-of-computation",
        permanent: true,
      },
      {
        source: "/subject/Theory%20of%20Computation",
        destination: "/subject/theory-of-computation",
        permanent: true,
      },

      {
        source: "/subject/Computer Network",
        destination: "/subject/computer-network",
        permanent: true,
      },
      {
        source: "/subject/Computer%20Network",
        destination: "/subject/computer-network",
        permanent: true,
      },

      {
        source: "/subject/Database Management System",
        destination: "/subject/database-management-system",
        permanent: true,
      },
      {
        source: "/subject/Database%20Management%20System",
        destination: "/subject/database-management-system",
        permanent: true,
      },

      {
        source: "/subject/C Programming",
        destination: "/subject/c-programming",
        permanent: true,
      },
      {
        source: "/subject/C%20Programming",
        destination: "/subject/c-programming",
        permanent: true,
      },

      {
        source: "/subject/Digital Logic",
        destination: "/subject/digital-logic",
        permanent: true,
      },
      {
        source: "/subject/Digital%20Logic",
        destination: "/subject/digital-logic",
        permanent: true,
      },

      {
        source: "/subject/Operating System",
        destination: "/subject/operating-system",
        permanent: true,
      },
      {
        source: "/subject/Operating%20System",
        destination: "/subject/operating-system",
        permanent: true,
      },

      {
        source: "/subject/Computer Organization & Architecture",
        destination: "/subject/computer-organization-and-architecture",
        permanent: true,
      },
      {
        source: "/subject/Computer%20Organization%20%26%20Architecture",
        destination: "/subject/computer-organization-and-architecture",
        permanent: true,
      },
      {
        source: "/subject/Computer Organization and Architecture",
        destination: "/subject/computer-organization-and-architecture",
        permanent: true,
      },

      {
        source: "/subject/Data Structure",
        destination: "/subject/data-structure",
        permanent: true,
      },
      {
        source: "/subject/Data%20Structure",
        destination: "/subject/data-structure",
        permanent: true,
      },

      {
        source: "/subject/Engineering Mathematics",
        destination: "/subject/engineering-mathematics",
        permanent: true,
      },
      {
        source: "/subject/Engineering%20Mathematics",
        destination: "/subject/engineering-mathematics",
        permanent: true,
      },

      {
        source: "/subject/Compiler Design",
        destination: "/subject/compiler-design",
        permanent: true,
      },
      {
        source: "/subject/Compiler%20Design",
        destination: "/subject/compiler-design",
        permanent: true,
      },

    ];
  },
};

module.exports = nextConfig;

// https://nextjs.org/docs/advanced-features/security-headers
const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://beamanalytics.b-cdn.net https://www.clarity.ms *.youtube.com *.twitter.com static.cloudflareinsights.com;
    child-src *.youtube.com *.google.com *.twitter.com https://app.youform.com/;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self';
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];
