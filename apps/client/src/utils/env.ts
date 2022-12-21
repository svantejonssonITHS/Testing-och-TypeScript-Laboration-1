const env: ImportMetaEnv = import.meta.env;

const API_URL: string = env.PUBLIC_API_URL;
const CLIENT_URL: string = env.PUBLIC_CLIENT_URL;
const AUTH0_DOMAIN: string = env.PUBLIC_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID: string = env.PUBLIC_AUTH0_CLIENT_ID;

export { API_URL, CLIENT_URL, AUTH0_DOMAIN, AUTH0_CLIENT_ID };
