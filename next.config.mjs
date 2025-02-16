/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
          // ...
        },
      },
    serverExternalPackages: ["mongoose"], // Moved from experimental
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        },
      ],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
      return config;
    }
  };
  
  export default nextConfig;
  