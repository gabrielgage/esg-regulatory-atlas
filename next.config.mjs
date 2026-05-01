/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/data-quality",
        destination: "/methodology",
        permanent: true
      }
    ];
  }
};
export default nextConfig;
