/* import { QueryClient } from "@tanstack/react-query";

export function attachVisibilitySync(qc: QueryClient) {
  const onFocus = () => qc.invalidateQueries();
  const onOnline = () => qc.invalidateQueries();

  window.addEventListener("focus", onFocus);
  window.addEventListener("online", onOnline);

  return () => {
    window.removeEventListener("focus", onFocus);
    window.removeEventListener("online", onOnline);
  };
}
 */
