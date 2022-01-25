import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication({
  name: "@recipiece/recipiece-login",
  app: () => System.import("//localhost:8081/recipiece-login.js"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});
