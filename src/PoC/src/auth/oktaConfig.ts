import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

export const oktaAuth = new OktaAuth({
  issuer: import.meta.env.VITE_OKTA_ISSUER,
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  pkce: true,
});

export const buildRestoreOriginalUri = (
  navigate: (path: string, opts?: any) => void
) => {
  return async (_oktaAuth: OktaAuth, originalUri?: string) => {
    const path = toRelativeUrl(originalUri || '/', window.location.origin);
    navigate(path, { replace: true });
  };
};
