import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0Client = new Auth0Client({domain: process.env['AUTH0_ISSUER_BASE_URL'],
    appBaseUrl: process.env['APP_BASE_URL']
});