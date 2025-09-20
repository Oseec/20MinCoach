import { useOktaAuth } from "@okta/okta-react";

export function useHasScope(scope: string) {
  const { authState } = useOktaAuth();
  const scopes: string[] = (authState?.accessToken?.claims as any)?.scp || [];
  return scopes.includes(scope);
}
