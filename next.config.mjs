// next.config.mjs

const nextConfig = {
    redirects() {
      return [
        {
          source: "/",
          destination: "/discover/now_playing",
          permanent: false,
        },
      ];
    },
    images: {
      domains: ["image.tmdb.org"],
    },
  };
  
  export default nextConfig;
  