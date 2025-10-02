/* type Unsubscribe = () => void;

export class EventBus {
  private listeners = new Map<string, Set<(payload: any) => void>>();

  on<T = any>(event: string, handler: (payload: T) => void): Unsubscribe {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(handler as any);
    return () => this.listeners.get(event)?.delete(handler as any);
  }

  emit<T = any>(event: string, payload: T): void {
    this.listeners.get(event)?.forEach(h => h(payload));
  }

  clear() { this.listeners.clear(); }
}

export const eventBus = new EventBus(); */
