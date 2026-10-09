import { event } from "https://analytics-vd3-api.w1.ok2m.yourrealm.me/script.js";

document.addEventListener("click", (e) => {
  const a = e.target.closest?.("a[data-event]");
  if (!a) return;
  const { event: name, ...properties } = a.dataset;
  event(name, { properties }).catch(() => {});
});
