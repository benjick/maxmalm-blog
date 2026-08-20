import { createApp, r } from "@yourrealm/sdk";

export default createApp({
  name: "maxmalm",
  description: "maxmalm.se - personal blog",

  configSchema: {
    domain: r.home
      .publicDomain()
      .reason("Serve maxmalm.se without Home's login in front")
      .optional(),
  },

  getDesiredState: ({ config }) => ({
    services: {
      web: {
        build: {},
        router: {
          containerPort: 8080,
          publicDomain: config.domain,
        },
      },
    },
  }),
});
