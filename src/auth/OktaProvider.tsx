import { PropsWithChildren } from 'react';
import { Security } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import { oktaAuth, buildRestoreOriginalUri } from './oktaConfig';

export default function OktaProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  return (
    <Security
      oktaAuth={oktaAuth}
      restoreOriginalUri={buildRestoreOriginalUri(navigate)}
    >
      {children}
    </Security>
  );
}
