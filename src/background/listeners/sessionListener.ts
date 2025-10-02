/* import { eventBus } from "../events/eventBus";

// se centralizan reacciones a eventos de sesión
export function attachSessionListener() {
  const offCreated = eventBus.on("session:created", (p: any) => {
    // e.g. invalidar caches / mostrar toast
    console.log("Nueva sesión", p);
  });
  const offStarted = eventBus.on("session:started", (p: any) => {
    console.log("Sesión inició", p);
  });

  return () => { offCreated(); offStarted(); };
}
 */
