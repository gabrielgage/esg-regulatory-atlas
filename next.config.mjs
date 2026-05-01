/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/regulations/issb-ifrs-s1",
        destination: "/regulations/issb-s1-s2",
        permanent: true
      },
      {
        source: "/regulations/issb-ifrs-s2",
        destination: "/regulations/issb-s1-s2",
        permanent: true
      },
      {
        source: "/regulations/issb",
        destination: "/regulations/issb-s1-s2",
        permanent: true
      },
      {
        source: "/regulations/ifrs-s1",
        destination: "/regulations/issb-s1-s2",
        permanent: true
      }
    ];
  }
};
export default nextConfig;
