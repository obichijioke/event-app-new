/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "appwrite.awoofcity.com",
        port: "",
        pathname: "/v1/avatars/**",
      },
    ],
  },
};

export default nextConfig;
