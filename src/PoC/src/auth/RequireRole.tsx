import { Navigate, useLocation } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

export function useRoles(): string[] {
  const { authState } = useOktaAuth();
  return ((authState?.idToken?.claims as any)?.roles as string[]) ?? [];
}

export default function RequireRole({
  anyOf,
  children,
}: {
  anyOf: string[];
  children: JSX.Element;
}) {
  const { authState } = useOktaAuth();
  const location = useLocation();

  // 1) Mientras Okta calcula el estado, no decidas nada aún
  if (authState?.isAuthenticated === undefined) {
    return null; // o un spinner si quieres
  }

  // 2) Si definitivamente NO está autenticado, manda a /login
  if (!authState?.isAuthenticated) {
    const target = `/login?from=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={target} replace />;
  }

  // 3) Si sí está autenticado, valida roles
  const roles = ((authState.idToken?.claims as any)?.roles as string[]) ?? [];
  const ok = roles.some(r => anyOf.includes(r));
  if (!ok) return <Navigate to="/403" replace />;

  return children;
}
