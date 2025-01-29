// next.config.mjs

export default {
  images: {
    remotePatterns: [
      {
        protocol: "https", // using https here
        hostname: "newproject-448220.ew.r.appspot.com",
        pathname: "/**", // to allow any path
      },
    ],
  },
};
