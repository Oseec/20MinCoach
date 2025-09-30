// src/components/layout/Header.tsx
import { Bell, User, Menu, Video, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useOktaAuth } from '@okta/okta-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  user?: {
    firstName: string;
    lastName: string;
    profilePictureUrl?: string;
    role: string;
  };
  onMenuClick?: () => void;
  notifications?: number;
}

export const Header = ({
  user,
  onMenuClick,
  notifications = 0,
}: HeaderProps) => {
  const { oktaAuth, authState } = useOktaAuth();
  const location = useLocation();

  const handleSignIn = async () => {
    // vuelve a la misma ruta después de login (o cambia a "/coaches" si prefieres)
    await oktaAuth.signInWithRedirect({
      originalUri: location.pathname || '/',
    });
  };

  const handleSignOut = async () => {
    await oktaAuth.signOut({
      // al cerrar sesión vuelve al landing
      postLogoutRedirectUri: window.location.origin + '/',
    });
  };

  const isAuthed = !!authState?.isAuthenticated;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Video className="h-6 w-6 text-primary" />
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                20minCoach
              </span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                {notifications > 9 ? '9+' : notifications}
              </Badge>
            )}
          </Button>

          {/* User menu (cuando hay sesión) */}
          {isAuthed && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.profilePictureUrl}
                      alt={user.firstName}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.role === 'COACH' ? 'Coach' : 'Cliente'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Mi perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    handleSignOut();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Buttons cuando NO hay sesión
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={handleSignIn}>
                Iniciar sesión
              </Button>
              <Button onClick={handleSignIn}>Registrarse</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
