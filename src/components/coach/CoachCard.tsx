import { Star, Clock, Languages, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatRating } from '@/utils/formatUtils';

interface CoachCardProps {
  coach: {
    id: string;
    userId: string;
    bio: string;
    headline: string;
    specialties: Array<{
      id: string;
      name: string;
      category: string;
    }>;
    experience: number;
    rating: number;
    totalSessions: number;
    pricePerSession: number;
    isVerified: boolean;
    isOnline: boolean;
  };
  user: {
    firstName: string;
    lastName: string;
    profilePictureUrl?: string;
  };
  onBookSession?: (coachId: string) => void;
  onViewProfile?: (coachId: string) => void;
}

export const CoachCard = ({
  coach,
  user,
  onBookSession,
  onViewProfile,
}: CoachCardProps) => {
  return (
    <Card className="group overflow-hidden border shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.profilePictureUrl} alt={user.firstName} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {coach.isOnline && (
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-success border-2 border-background" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg truncate">
                {user.firstName} {user.lastName}
              </h3>
              {coach.isVerified && (
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
              )}
            </div>

            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
              {coach.headline}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium">
                  {formatRating(coach.rating)}
                </span>
                <span>({coach.totalSessions})</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{coach.experience} años</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(coach.pricePerSession)}
            </div>
            <div className="text-sm text-muted-foreground">por sesión</div>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {coach.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty.id} variant="secondary" className="text-xs">
              {specialty.name}
            </Badge>
          ))}
          {coach.specialties.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{coach.specialties.length - 3} más
            </Badge>
          )}
        </div>

        {/* Bio preview */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {coach.bio}
        </p>

        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                coach.isOnline ? 'bg-success' : 'bg-muted-foreground'
              }`}
            />
            <span className="text-sm text-muted-foreground">
              {coach.isOnline ? 'Disponible ahora' : 'Sin conexión'}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onViewProfile?.(coach.id)}
        >
          Ver perfil
        </Button>
        <Button
          className="flex-1"
          onClick={() => onBookSession?.(coach.id)}
          disabled={!coach.isOnline}
        >
          {coach.isOnline ? 'Conectar ahora' : 'No disponible'}
        </Button>
      </CardFooter>
    </Card>
  );
};
