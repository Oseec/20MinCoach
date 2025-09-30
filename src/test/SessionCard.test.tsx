import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SessionCard } from '../components/session/SessionCard'

// mock utils
vi.mock('@/utils/timeUtils', () => ({
  formatSessionTime: () => '10:00 AM',
  formatDuration: () => '60 min',
}))

const baseSession = {
  id: 's1',
  title: 'Sesión de prueba',
  scheduledAt: new Date().toISOString(),
  duration: 60,
  status: 'SCHEDULED',
  sessionType: 'PROGRAMMED',
}

const baseCoach = {
  user: { firstName: 'Ana', lastName: 'Coach', profilePictureUrl: undefined },
  headline: 'Coach de liderazgo',
}

const baseClient = {
  user: { firstName: 'Juan', lastName: 'Client', profilePictureUrl: undefined },
}

describe('SessionCard', () => {
  it('renders session info', () => {
    render(
      <SessionCard
        session={baseSession}
        coach={baseCoach}
        client={baseClient}
        userRole="CLIENT"
      />
    )

    expect(screen.getByText('Sesión de prueba')).toBeInTheDocument()
    expect(screen.getByText('Coach: Ana Coach')).toBeInTheDocument()
    expect(screen.getByText('10:00 AM')).toBeInTheDocument()
    expect(screen.getByText('60 min')).toBeInTheDocument()
  })

  it('shows join and cancel buttons when scheduled', () => {
    const onJoin = vi.fn()
    const onCancel = vi.fn()

    render(
      <SessionCard
        session={baseSession}
        coach={baseCoach}
        client={baseClient}
        userRole="CLIENT"
        onJoin={onJoin}
        onCancel={onCancel}
      />
    )

    const joinButton = screen.getByText('Unirse a sesión')
    const cancelButton = screen.getByText('Cancelar')

    fireEvent.click(joinButton)
    fireEvent.click(cancelButton)

    expect(onJoin).toHaveBeenCalledWith('s1')
    expect(onCancel).toHaveBeenCalledWith('s1')
  })

  it('shows rate button when completed without rating', () => {
    const onRate = vi.fn()
    const completedSession = { ...baseSession, status: 'COMPLETED', rating: undefined }

    render(
      <SessionCard
        session={completedSession}
        coach={baseCoach}
        client={baseClient}
        userRole="CLIENT"
        onRate={onRate}
      />
    )

    const rateButton = screen.getByText('Calificar')
    fireEvent.click(rateButton)

    expect(onRate).toHaveBeenCalledWith('s1')
  })

  it('shows rating when session has it', () => {
    const ratedSession = {
      ...baseSession,
      status: 'COMPLETED',
      rating: { rating: 4, comment: 'Muy buena sesión' },
    }

    render(
      <SessionCard
        session={ratedSession}
        coach={baseCoach}
        client={baseClient}
        userRole="CLIENT"
      />
    )

    expect(screen.getByText('4/5')).toBeInTheDocument()
    expect(screen.getByText(/Muy buena sesión/)).toBeInTheDocument()
    expect(screen.getByText('Sesión completada')).toBeDisabled()
  })

  it('renders client info when userRole is COACH', () => {
    render(
      <SessionCard
        session={baseSession}
        coach={baseCoach}
        client={baseClient}
        userRole="COACH"
      />
    )

    expect(screen.getByText('Cliente: Juan Client')).toBeInTheDocument()
  })
})
