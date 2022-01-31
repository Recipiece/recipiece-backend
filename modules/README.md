# Modules
These are the frontend components for Recipiece.
Recipiece uses [Single SPA](https://single-spa.js.org/) for its micro-frontends.

The `host` application is the root-configuration for all of the micro-frontends.

## Adding a New Module
`npx create-single-spa --moduleType app-parcel` is the easiest way to create a new module.

### React Modules
For React applications, you should specify the directory as the name of the folder you want, the app name without `recipiece` appended, and the organization as `recipiece`.
You will also need to remove the auto-generated `.git` folder, remove the `.husky` folder, uninstall husky, and remove the `prepare` command from `package.json`.

### Angular Modules
TBD

Make sure to specify an unused port in the appropriate serve command, and add the module as an entry to the `serve-dev.py` file.
It will also need to be registered in the `host` application.
