/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8081/api/:path*", // Redirigir solicitudes API al backend
      },
    ];
  },
};

module.exports = nextConfig;
