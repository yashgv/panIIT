module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude node modules related to child_process from client-side bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        fs: false, // You may also need to handle other Node.js core modules like fs
      };
    }
    return config;
  },
}
