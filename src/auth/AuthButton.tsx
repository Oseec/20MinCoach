import { useOktaAuth } from '@okta/okta-react';

export function SignInButton({
  force = false,
  callback = '/app/action-a',
}: {
  force?: boolean; // si true, muestra siempre el formulario aunque haya SSO
  callback?: string; // a dónde volver tras login
}) {
  const { oktaAuth } = useOktaAuth();
  return (
    <button
      className="inline-flex items-center rounded-md px-4 py-2 font-medium border"
      onClick={() =>
        oktaAuth.signInWithRedirect({
          originalUri: callback,
          extraParams: force ? { prompt: 'login', max_age: '0' } : undefined,
        })
      }
    >
      Iniciar sesión
    </button>
  );
}

export function SignOutButton({ redirect = '/login' }: { redirect?: string }) {
  const { oktaAuth } = useOktaAuth();
  return (
    <button
      className="inline-flex items-center rounded-md px-4 py-2 font-medium border"
      onClick={() =>
        oktaAuth.signOut({
          postLogoutRedirectUri: window.location.origin + redirect,
        })
      }
    >
      Cerrar sesión
    </button>
  );
}
