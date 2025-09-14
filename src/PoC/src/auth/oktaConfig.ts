import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";

export const oktaAuth = new OktaAuth({
  issuer: import.meta.env.VITE_OKTA_ISSUER,
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  redirectUri: import.meta.env.VITE_OKTA_REDIRECT_URI,
  scopes: ["openid", "profile", "email", "offline_access", "actionA:execute", "actionB:execute"],
  pkce: true,
});

export const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri?: string) => {
  window.history.replaceState({}, document.title, toRelativeUrl(originalUri || "/", window.location.origin));
};