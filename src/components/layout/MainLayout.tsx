import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  user?: {
    firstName: string;
    lastName: string;
    profilePictureUrl?: string;
    role: 'CLIENT' | 'COACH' | 'ADMIN';
  };
  currentPath?: string;
}

export const MainLayout = ({
  children,
  user,
  currentPath,
}: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        notifications={3}
      />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          userRole={user?.role}
          currentPath={currentPath}
        />

        <main className="flex-1 lg:ml-64">
          <div className="container max-w-7xl mx-auto p-6">{children}</div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
