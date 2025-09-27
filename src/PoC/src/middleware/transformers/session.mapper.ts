/* 
import { Session } from "@/models/Session";

export function mapSessionResponseToModel(dto: any): Session {
  return {
    id: dto.id,
    coachId: dto.coachId,
    title: dto.title,
    description: dto.description,
    scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
    duration: dto.duration ?? 20,
    status: dto.status,
    sessionType: dto.sessionType,
  };
} 
*/
