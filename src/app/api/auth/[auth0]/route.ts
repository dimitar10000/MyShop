import { handleAuth,handleProfile,handleLogin, handleLogout } from '@auth0/nextjs-auth0';

const logoutUrl = [
    `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?`,
    `client_id=${process.env.AUTH0_CLIENT_ID}`,
    `&returnTo=${process.env.AUTH0_BASE_URL}`,
  ];

export const GET = handleAuth({
    profile: handleProfile({ refetch: true }),
    login: handleLogin({ authorizationParams: {}}),
    logout: handleLogout({returnTo: logoutUrl.join('')}),
    signup: handleLogin({
        authorizationParams: {
          screen_hint: "signup"
        }})
}
);