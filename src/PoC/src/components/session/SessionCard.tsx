import { Clock, User, Calendar, Video, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatSessionTime, formatDuration } from '@/utils/timeUtils';

interface SessionCardProps {
  session: {
    id: string;
    title: string;
    scheduledAt: string;
    duration: number;
    status: string;
    sessionType: string;
    rating?: {
      rating: number;
      comment?: string;
    };
  };
  coach?: {
    user: {
      firstName: string;
      lastName: string;
      profilePictureUrl?: string;
    };
    headline: string;
  };
  client?: {
    user: {
      firstName: string;
      lastName: string;
      profilePictureUrl?: string;
    };
  };
  userRole: 'CLIENT' | 'COACH';
  onJoin?: (sessionId: string) => void;
  onCancel?: (sessionId: string) => void;
  onRate?: (sessionId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'SCHEDULED':
      return 'bg-primary';
    case 'ACTIVE':
      return 'bg-success';
    case 'COMPLETED':
      return 'bg-muted';
    case 'CANCELLED':
      return 'bg-destructive';
    default:
      return 'bg-muted';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'SCHEDULED':
      return 'Programada';
    case 'WAITING':
      return 'Esperando';
    case 'ACTIVE':
      return 'En curso';
    case 'COMPLETED':
      return 'Completada';
    case 'CANCELLED':
      return 'Cancelada';
    default:
      return status;
  }
};

export const SessionCard = ({ 
  session, 
  coach, 
  client, 
  userRole, 
  onJoin, 
  onCancel, 
  onRate 
}: SessionCardProps) => {
  const otherUser = userRole === 'CLIENT' ? coach : client;
  const scheduledDate = new Date(session.scheduledAt);
  const canJoin = session.status === 'SCHEDULED' || session.status === 'WAITING';
  const canCancel = session.status === 'SCHEDULED';
  const canRate = session.status === 'COMPLETED' && !session.rating;

  return (
    <Card className="overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {otherUser && (
              <Avatar className="h-12 w-12">
                <AvatarImage 
                  src={otherUser.user.profilePictureUrl} 
                  alt={otherUser.user.firstName} 
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {otherUser.user.firstName.charAt(0)}{otherUser.user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            
            <div>
              <h3 className="font-semibold text-lg mb-1">{session.title}</h3>
              {otherUser && (
                <p className="text-muted-foreground text-sm">
                  {userRole === 'CLIENT' ? 'Coach' : 'Cliente'}: {otherUser.user.firstName} {otherUser.user.lastName}
                </p>
              )}
              {coach?.headline && userRole === 'CLIENT' && (
                <p className="text-muted-foreground text-xs mt-1">{coach.headline}</p>
              )}
            </div>
          </div>

          <Badge className={getStatusColor(session.status)}>
            {getStatusText(session.status)}
          </Badge>
        </div>

        {/* Session details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatSessionTime(scheduledDate)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(session.duration)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Video className="h-4 w-4" />
            <span>{session.sessionType === 'INSTANT' ? 'Instantánea' : 'Programada'}</span>
          </div>

          {session.rating && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span>{session.rating.rating}/5</span>
            </div>
          )}
        </div>

        {/* Rating comment if exists */}
        {session.rating?.comment && (
          <div className="bg-muted rounded-lg p-3 mt-4">
            <p className="text-sm text-muted-foreground italic">
              "{session.rating.comment}"
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        {canJoin && (
          <Button 
            className="flex-1" 
            onClick={() => onJoin?.(session.id)}
          >
            <Video className="h-4 w-4 mr-2" />
            Unirse a sesión
          </Button>
        )}
        
        {canCancel && (
          <Button 
            variant="outline" 
            onClick={() => onCancel?.(session.id)}
          >
            Cancelar
          </Button>
        )}
        
        {canRate && userRole === 'CLIENT' && (
          <Button 
            variant="outline"
            onClick={() => onRate?.(session.id)}
          >
            <Star className="h-4 w-4 mr-2" />
            Calificar
          </Button>
        )}
        
        {session.status === 'COMPLETED' && session.rating && (
          <Button variant="ghost" disabled className="flex-1">
            Sesión completada
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};