// next.config.mjs

export default {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shop-0001.vercel.app",
        pathname: "/**",
      },
    ],
  },
};
