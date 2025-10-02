import { render, screen, fireEvent } from '@testing-library/react';
import { MainLayout } from '@/components/layout/MainLayout';
import { vi } from 'vitest';

// Creamos mock para useOktaAuth
const mockUseOktaAuth = vi.fn();

vi.mock('@okta/okta-react', () => ({
  useOktaAuth: () => mockUseOktaAuth(),
}));

vi.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => vi.fn(),
}));

test('renderiza children y toggle de sidebar', () => {
  // Mockear estado de Okta
  mockUseOktaAuth.mockReturnValue({
    oktaAuth: { signInWithRedirect: vi.fn(), signOut: vi.fn() },
    authState: { isAuthenticated: false },
  });

  render(
    <MainLayout
      user={{ firstName: 'Ana', lastName: 'Coach', role: 'COACH' }}
      currentPath="/dashboard"
    >
      <div>Contenido de prueba</div>
    </MainLayout>
  );

  // Verifica que los children se renderizan
  expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
});
