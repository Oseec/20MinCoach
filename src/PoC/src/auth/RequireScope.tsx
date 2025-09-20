import { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

export function hasAllScopes(scopesStr: string[] | undefined, required: string[]) {
  if (!scopesStr) return false;
  const set = new Set(scopesStr);
  return required.every((s) => set.has(s));
}

/**
 * Protege rutas o fragmentos:
 * - Si no está autenticado → dispara Okta `signInWithRedirect` y vuelve a la URL actual.
 * - Si no tiene los scopes requeridos → /403
 */
export default function RequireScope({
  scopes,
  children,
  redirectTo = "/403",
  forceLogin = false, // si quieres forzar formulario aunque haya SSO
}: {
  scopes: string[];
  children: JSX.Element;
  redirectTo?: string;
  forceLogin?: boolean;
}) {
  const { oktaAuth, authState } = useOktaAuth();
  const location = useLocation();
  const redirectingRef = useRef(false);

  // scopes del access token
  const tokenScopes = (authState?.accessToken?.claims as any)?.scp as
    | string[]
    | undefined;

  // Si NO autenticado → ir directo a Okta y volver a la URL actual
  useEffect(() => {
    if (authState?.isAuthenticated === false && !redirectingRef.current) {
      redirectingRef.current = true;
      const originalUri = location.pathname + location.search + location.hash;
      oktaAuth.signInWithRedirect({
        originalUri,
        extraParams: forceLogin ? { prompt: "login", max_age: "0" } : undefined,
      });
    }
  }, [authState?.isAuthenticated, oktaAuth, location, forceLogin]);

  if (authState?.isAuthenticated === false) {
    // Evita render mientras Okta redirige
    return null;
  }

  if (authState?.isAuthenticated && !hasAllScopes(tokenScopes, scopes)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

/* Opcionales, por si te resultan útiles */
export function RequireAuthenticated({
  children,
  forceLogin = false,
}: {
  children: JSX.Element;
  forceLogin?: boolean;
}) {
  return (
    <RequireScope scopes={[]} forceLogin={forceLogin} redirectTo="/403">
      {children}
    </RequireScope>
  );
}

export function RequireAnyScope({
  anyOf,
  children,
  redirectTo = "/403",
}: {
  anyOf: string[];
  children: JSX.Element;
  redirectTo?: string;
}) {
  const { authState } = useOktaAuth();
  const tokenScopes = (authState?.accessToken?.claims as any)?.scp as
    | string[]
    | undefined;
  const ok =
    !!tokenScopes && anyOf.some((s) => new Set(tokenScopes).has(s));
  return ok ? children : <Navigate to={redirectTo} replace />;
}
