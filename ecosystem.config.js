module.exports = {
  apps: [
    {
      name: "lahelu-web",
      script: "npx expo export -p web && npx serve dist --single -l 2999",
      instances: 1,
    },
  ],
};
