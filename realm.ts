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
          headers: {
            // script/connect: Plausible and our analytics app. connect, worker,
            // img blob:: the MapLibre maps and their Maptoolkit/Mapterhorn
            // tiles. frame, img ytimg: YouTube embeds. style-src-attr: Shiki
            // colours code blocks with style="" attributes.
            "Content-Security-Policy":
              "default-src 'self'; " +
              "script-src 'self' https://plausible.io https://analytics-vd3-api.w1.ok2m.yourrealm.me; " +
              "connect-src 'self' https://plausible.io https://analytics-vd3-api.w1.ok2m.yourrealm.me https://styles.maptoolkit.org https://tiles.maptoolkit.org https://icons.maptoolkit.org https://fonts.maptoolkit.org https://tiles.mapterhorn.com; " +
              "img-src 'self' data: blob: https://i.imgur.com https://i.ytimg.com; " +
              "worker-src blob:; " +
              "frame-src https://www.youtube-nocookie.com; " +
              "style-src-attr 'unsafe-inline'; " +
              "frame-ancestors 'self'; base-uri 'self'; form-action 'self'",
          },
        },
      },
    },
  }),
});
