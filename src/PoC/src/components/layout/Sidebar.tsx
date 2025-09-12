import { 
  Home, 
  Calendar, 
  Users, 
  MessageSquare, 
  Settings, 
  CreditCard,
  BarChart3,
  Video,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen?: boolean;
  userRole?: 'CLIENT' | 'COACH' | 'ADMIN';
  currentPath?: string;
}

const clientMenuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Buscar Coaches', path: '/coaches' },
  { icon: Calendar, label: 'Mis Sesiones', path: '/sessions' },
  { icon: CreditCard, label: 'Paquetes', path: '/packages' },
  { icon: MessageSquare, label: 'Mensajes', path: '/messages' },
  { icon: Settings, label: 'Configuración', path: '/settings' },
];

const coachMenuItems = [
  { icon: Home, label: 'Dashboard', path: '/coach/dashboard' },
  { icon: Calendar, label: 'Mi Agenda', path: '/coach/schedule' },
  { icon: Video, label: 'Sesiones Activas', path: '/coach/sessions' },
  { icon: Users, label: 'Mis Clientes', path: '/coach/clients' },
  { icon: BarChart3, label: 'Estadísticas', path: '/coach/analytics' },
  { icon: Clock, label: 'Disponibilidad', path: '/coach/availability' },
  { icon: Settings, label: 'Mi Perfil', path: '/coach/profile' },
];

export const Sidebar = ({ isOpen = true, userRole = 'CLIENT', currentPath = '' }: SidebarProps) => {
  const menuItems = userRole === 'COACH' ? coachMenuItems : clientMenuItems;

  return (
    <aside className={cn(
      "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform border-r bg-background transition-transform duration-200 ease-in-out lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-auto p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12",
                    isActive && "bg-secondary text-secondary-foreground font-medium"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>

        {/* Status indicator for coaches */}
        {userRole === 'COACH' && (
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success animate-pulse-gentle" />
              <span className="text-sm text-muted-foreground">En línea</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};