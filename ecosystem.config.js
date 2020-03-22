module.exports = {
  apps: [
    {
      name: "simurgh",
      script: "./index.js",
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
