const env: ImportMetaEnv = import.meta.env;

const AUTH0_DOMAIN: string = env.PUBLIC_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID: string = env.PUBLIC_AUTH0_CLIENT_ID;

export { AUTH0_DOMAIN, AUTH0_CLIENT_ID };
