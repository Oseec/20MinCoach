import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Link, useSearchParams } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { CoachSearch } from "./pages/CoachSearch";
import { MainLayout } from "./components/layout/MainLayout";
import NotFound from "./pages/NotFound";

import { useOktaAuth, LoginCallback } from "@okta/okta-react";
import RequireScope from "./auth/RequireScope";
import ActionA from "./pages/actionA";
import ActionB from "./pages/actionB";
import Forbidden from "./pages/Forbidden";
import Debug from "./pages/Debug";

const queryClient = new QueryClient();

const mockUser = {
  firstName: "Ana",
  lastName: "García",
  role: "CLIENT" as const,
  profilePictureUrl: undefined,
};

function Login() {
  const { oktaAuth, authState } = useOktaAuth();
  const [params] = useSearchParams();

  const signIn = async (force = false) => {
    await oktaAuth.signInWithRedirect({
      originalUri: params.get("from") ?? "/app/action-a",
      // fuerza pantalla de login aunque haya SSO
      extraParams: force ? { prompt: "login", max_age: "0" } : undefined,
    });
  };

  const signOut = async () => {
    await oktaAuth.signOut({ postLogoutRedirectUri: window.location.origin + "/login" });
  };

  if (authState?.isAuthenticated) {
    return (
      <div className="p-4 space-y-2">
        Ya estás autenticado. <Link to="/app/action-a">Ir a Action A</Link>
        <div>
          <button className="border rounded px-3 py-1" onClick={signOut}>
            Cambiar de usuario (Sign out)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <button className="border rounded px-4 py-2" onClick={() => signIn(false)}>
        Sign in (Okta)
      </button>
      <button className="border rounded px-4 py-2" onClick={() => signIn(true)}>
        Forzar login (pedir credenciales)
      </button>
    </div>
  );
}


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        {/* públicas que ya tenías */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout user={mockUser} currentPath="/dashboard">
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/coaches"
          element={
            <MainLayout user={mockUser} currentPath="/coaches">
              <CoachSearch />
            </MainLayout>
          }
        />

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/403" element={<Forbidden />} />

        {/* acciones protegidas por scope */}
        <Route
          path="/app/action-a"
          element={
            <RequireScope scopes={["actionA:execute"]}>
              <ActionA />
            </RequireScope>
          }
        />
        <Route
          path="/app/action-b"
          element={
            <RequireScope scopes={["actionB:execute"]}>
              <ActionB />
            </RequireScope>
          }
        />

        {/* debug y catch-all */}
        <Route path="/debug" element={<Debug />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;