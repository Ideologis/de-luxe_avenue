import NextConfig from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  experimental: {
    reactCompiler: false,
  },
};

// Wrap your `nextConfig` with the `withPayload` plugin
export default withPayload(nextConfig);
// import { withPayload } from "@payloadcms/next/withPayload";

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Your Next.js config here
//   experimental: {
//     reactCompiler: false,
//   },
// };

// // Make sure you wrap your `nextConfig`
// // with the `withPayload` plugin
// export default withPayload(nextConfig);
