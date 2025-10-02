/* import { QueryClient } from "@tanstack/react-query";

export function startLightPolling(qc: QueryClient) {
  // ejemplo: refrescar lista de coaches cada 60s
  qc.invalidateQueries({ queryKey: ["coaches"] });
  const id = setInterval(() => {
    qc.invalidateQueries({ queryKey: ["coaches"] });
  }, 60_000);
  return () => clearInterval(id);
}
 */
