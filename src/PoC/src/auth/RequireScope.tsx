import { Navigate, useLocation } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

export function hasAllScopes(scopesStr: string[] | undefined, required: string[]) {
  if (!scopesStr) return false;
  const set = new Set(scopesStr);
  return required.every(s => set.has(s));
}

export default function RequireScope({ scopes, children }: { scopes: string[]; children: JSX.Element; }) {
  const { authState } = useOktaAuth();
  const location = useLocation();

  // authState?.isAuthenticated ya implica que hay tokens
  const tokenScopes = (authState?.accessToken?.claims as any)?.scp as string[] | undefined;

  if (!authState?.isAuthenticated) {
    // redirige a login y al volver conserva destino
    const target = `/login?from=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={target} replace />;
  }

  if (!hasAllScopes(tokenScopes, scopes)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
