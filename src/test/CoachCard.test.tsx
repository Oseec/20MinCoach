import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CoachCard } from '../components/coach/CoachCard';

// mock utils para no depender de formato real
vi.mock('@/utils/formatUtils', () => ({
  formatCurrency: (v: number) => `$${v}`,
  formatRating: (r: number) => r.toFixed(1),
}));

const mockCoach = {
  id: '1',
  userId: 'u1',
  bio: 'Coach especializado en mindfulness.',
  headline: 'Coach de Liderazgo',
  specialties: [
    { id: 's1', name: 'Liderazgo', category: 'Business' },
    { id: 's2', name: 'Mindfulness', category: 'Psychology' },
    { id: 's3', name: 'Comunicación', category: 'Soft Skills' },
    { id: 's4', name: 'Gestión del Tiempo', category: 'Productivity' },
  ],
  experience: 5,
  rating: 4.7,
  totalSessions: 120,
  pricePerSession: 50,
  isVerified: true,
  isOnline: true,
};

const mockUser = {
  firstName: 'Juan',
  lastName: 'Quiros',
  profilePictureUrl: undefined,
};

describe('CoachCard', () => {
  it('renders coach information correctly', () => {
    render(<CoachCard coach={mockCoach} user={mockUser} />);

    expect(screen.getByText('Juan Quiros')).toBeInTheDocument();
    expect(screen.getByText('Coach de Liderazgo')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('Disponible ahora')).toBeInTheDocument();
  });

  it('shows specialties and counts extra', () => {
    render(<CoachCard coach={mockCoach} user={mockUser} />);

    // 3 primeras
    expect(screen.getByText('Liderazgo')).toBeInTheDocument();
    expect(screen.getByText('Mindfulness')).toBeInTheDocument();
    expect(screen.getByText('Comunicación')).toBeInTheDocument();

    // el resto en +X más
    expect(screen.getByText('+1 más')).toBeInTheDocument();
  });

  it('calls onBookSession when clicking Conectar ahora', () => {
    const onBookSession = vi.fn();

    render(
      <CoachCard
        coach={mockCoach}
        user={mockUser}
        onBookSession={onBookSession}
      />
    );

    fireEvent.click(screen.getByText('Conectar ahora'));
    expect(onBookSession).toHaveBeenCalledWith('1');
  });

  it('disables connect button when coach is offline', () => {
    const offlineCoach = { ...mockCoach, isOnline: false };

    render(<CoachCard coach={offlineCoach} user={mockUser} />);

    const button = screen.getByText('No disponible');
    expect(button).toBeDisabled();
  });
});
