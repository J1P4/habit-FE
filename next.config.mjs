/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        // / 에서 /(landing) 으로 리디렉션
        return [
            {
                source: '/home',
                destination: '/',
                permanent: false
            }
        ];
    },

    async rewrites() {
        return [
          {
            source: "/:path*",
            destination: "https://openapi.naver.com/:path*",
          },
        ];
    }
};

export default nextConfig;
