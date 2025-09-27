import { useOktaAuth } from '@okta/okta-react';
export default function Debug() {
  const { authState } = useOktaAuth();
  return (
    <pre className="p-4">
      {JSON.stringify(
        {
          isAuthenticated: authState?.isAuthenticated,
          scopes: (authState?.accessToken?.claims as any)?.scp,
          roles: (authState?.idToken?.claims as any)?.roles,
        },
        null,
        2
      )}
    </pre>
  );
}
