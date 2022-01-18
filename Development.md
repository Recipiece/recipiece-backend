# Developing

Recipiece code is split into two main parts: `services`, which contains all the API related code, and `frontend`, which contains the frontend related code.

## Services
The `services` directory contains the code powering the backed of Recipiece.
Most of the underlying directories there contain a single microservice.
See the README.md in each service to learn more.

### Secrets
The `auth` service will be missing a critical file upon first clone.
Create a file called `secrets.ts` with the following content
```typescript
export const SECRET_KEY: string = '<my cool secret key>';
```

This secret key is used to manage encryption for the application.

### Docker
The Recipiece API uses docker to assist in development.
This isn't necessary, but a lot of the development infrastructure is built up around it.

The top level `docker` folder contains the necessary dockerfiles for the `docker-compose.dev.yaml` file to run.
Simply run `docker-compose -f docker/docker-compose.dev.yaml up` in the root folder to spin up the necessary dev services.

The node containers will use a nodemon script to watch for changed in `common` and the service that it is running, and hot reload when appropriate.

The python containers will run a debug flask server that will reload on changes.

### Environment
Checkout the `environment-constants.ts` file in `common/src/constants` to see all of the environment variables that Recipiece uses.
The defaults are setup to work out of the box when developing.

The biggest gotcha, and a requirement for your own deployment is that you MUST seed an internal user into mongo, and set the session token for the `RCP_INTERNAL_USER` to the session token for that user.
This environment variable is used to authenticate internal requests for services like `database`, `memcache`, and `auth`, which are not exposed in a live deployment.
