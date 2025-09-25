import { useState } from 'react';
import { Calendar, Clock, Users, TrendingUp, Video, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SessionCard } from '@/components/session/SessionCard';
import { CoachCard } from '@/components/coach/CoachCard';
import { useOktaAuth } from '@okta/okta-react';
import { hasAllScopes } from '@/auth/RequireScope';
import { useRoles } from "@/auth/RequireRole";

// Mock data
const mockUser = {
  firstName: 'Juan',
  lastName: 'García',
  role: 'CLIENT' as const,
  profilePictureUrl: undefined
};

const mockStats = {
  totalSessions: 12,
  thisMonth: 3,
  totalMinutes: 240,
  remainingMinutes: 180
};

const mockUpcomingSessions = [
  {
    id: '1',
    title: 'Consulta de Salud Mental',
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    duration: 20,
    status: 'SCHEDULED',
    sessionType: 'SCHEDULED'
  },
  {
    id: '2',
    title: 'Asesoría Tecnológica',
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    duration: 20,
    status: 'SCHEDULED',
    sessionType: 'INSTANT'
  }
];

const mockRecommendedCoaches = [
  {
    id: '1',
    userId: '1',
    bio: 'Especialista en desarrollo personal con más de 8 años de experiencia ayudando a personas a alcanzar sus objetivos.',
    headline: 'Coach de Desarrollo Personal y Liderazgo',
    specialties: [
      { id: '1', name: 'Desarrollo Personal', category: 'PSYCHOLOGY' },
      { id: '2', name: 'Liderazgo', category: 'BUSINESS' }
    ],
    experience: 8,
    rating: 4.9,
    totalSessions: 156,
    pricePerSession: 45,
    isVerified: true,
    isOnline: true
  }
];

const mockCoachUser = {
  firstName: 'Dr. Carlos',
  lastName: 'Mendoza',
  profilePictureUrl: undefined
};

export const Dashboard = () => {
  const [userRole] = useState<'CLIENT' | 'COACH'>('CLIENT');

  //Scopes desde el access token
  const { authState } = useOktaAuth();
  //const tokenScopes = (authState?.accessToken?.claims as any)?.scp as string[] | undefined;
  const roles = useRoles();
  const isPremium = roles.includes("PremiumUser");

  const canA = true;
  const canB = isPremium;;

  // Handlers respetando permisos
  const handleInstant = () => {
    if (!canA) return alert('Tu plan no permite iniciar sesiones (requiere Acción A).');
    console.log('Sesión instantánea');
  };
  const handleSchedule = () => {
    if (!canA) return alert('Tu plan no permite programar sesiones (requiere Acción A).');
    console.log('Programar sesión');
  };
  const handleSearch = () => {
    console.log('Ir a buscar coaches');
  };
  const handleViewReports = () => {
    if (!canB) return alert('Este contenido es para cuentas Premium (Acción B).');
    console.log('Abrir reportes premium');
  };
  const handleBookRecommended = (id: string) => {
    if (!canA) return alert('Tu plan no permite reservar sesiones (requiere Acción A).');
    console.log('Book session with:', id);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            ¡Hola, {mockUser.firstName}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Aquí tienes un resumen de tu actividad reciente
          </p>

          {/* Avisos de plan */}
          {!canA && (
            <div className="mt-3">
              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                Tu plan actual no permite reservar / programar sesiones (Acción A)
              </Badge>
            </div>
          )}
          {!canB && (
            <div className="mt-2">
              <Badge variant="outline" className="bg-violet-50 text-violet-800 border-violet-200">
                Los reportes premium requieren plan Premium (Acción B)
              </Badge>
            </div>
          )}
        </div>
        <Button size="lg" className="mt-4 md:mt-0" onClick={handleSchedule}>
          <Plus className="h-5 w-5 mr-2" />
          Nueva sesión
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sesiones</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              +{mockStats.thisMonth} este mes
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minutos Totales</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalMinutes}</div>
            <p className="text-xs text-muted-foreground">
              Tiempo invertido en coaching
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minutos Restantes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{mockStats.remainingMinutes}</div>
            <p className="text-xs text-muted-foreground">
              En tus paquetes activos
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coaches Favoritos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              En tu lista de favoritos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Acciones rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={handleInstant}
              disabled={!canA}
              title={!canA ? 'Requiere Acción A' : undefined}
            >
              <Video className="h-6 w-6" />
              <span>Sesión instantánea</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={handleSchedule}
              disabled={!canA}
              title={!canA ? 'Requiere Acción A' : undefined}
            >
              <Calendar className="h-6 w-6" />
              <span>Programar sesión</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={handleSearch}
            >
              <Users className="h-6 w-6" />
              <span>Buscar coaches</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upcoming Sessions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Próximas sesiones</h2>
            <Button variant="outline" size="sm">Ver todas</Button>
          </div>
          
          <div className="space-y-4">
            {mockUpcomingSessions.length > 0 ? (
              mockUpcomingSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  coach={{
                    user: mockCoachUser,
                    headline: 'Especialista en Desarrollo Personal'
                  }}
                  userRole={userRole}
                  onJoin={(id) => console.log('Join session:', id)}
                  onCancel={(id) => console.log('Cancel session:', id)}
                />
              ))
            ) : (
              <Card className="border-dashed border-2 border-muted">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No tienes sesiones programadas</h3>
                  <p className="text-muted-foreground mb-4">
                    Programa tu primera sesión con un coach
                  </p>
                  <Button onClick={handleSearch}>Buscar coaches</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recommended Coaches */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Coaches recomendados</h2>
            <Button variant="outline" size="sm">Ver más</Button>
          </div>
          
          <div className="space-y-4">
            {mockRecommendedCoaches.map((coach) => (
              <CoachCard
                key={coach.id}
                coach={coach}
                user={mockCoachUser}
                onBookSession={(id) => handleBookRecommended(id)}
                onViewProfile={(id) => console.log('View profile:', id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border shadow-soft">
        <CardHeader>
          <CardTitle>Actividad reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Sesión completada con Dr. Carlos Mendoza</p>
                <p className="text-sm text-muted-foreground">Hace 2 horas • Desarrollo Personal</p>
              </div>
              <Badge variant="secondary">Completada</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Paquete de 100 minutos adquirido</p>
                <p className="text-sm text-muted-foreground">Hace 1 día</p>
              </div>
              <Badge variant="outline">Compra</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bloque Premium */}
      <Card className="border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Reportes premium
          </CardTitle>
        </CardHeader>
        <CardContent>
          {canB ? (
            <Button onClick={handleViewReports}>Ver reportes</Button>
          ) : (
            <p className="text-muted-foreground">
              Este contenido está disponible para cuentas Premium.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
