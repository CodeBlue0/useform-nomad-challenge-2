/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "animated-tribble-r4gj559797rh59x5-3000.app.github.dev",
        "localhost:3000",
      ],
    },
  },
};

export default nextConfig;
