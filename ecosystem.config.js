module.exports = {
  apps: [
    {
      name: "lahelu-web",
      script: "npx expo export -p web && npx serve dist --single -- --port 2999",
      instances: 1,
    },
  ],
};
