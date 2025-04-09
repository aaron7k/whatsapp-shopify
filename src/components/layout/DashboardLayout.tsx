import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Database, 
  Users, 
  Settings, 
  Plus, 
  Calendar, 
  MessageSquare,
  LogOut
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const SidebarItem = ({ icon, label, to, isActive }: SidebarItemProps) => (
  <li>
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive
          ? "bg-sidebar-accent text-white"
          : "text-white/80 hover:text-white hover:bg-sidebar-accent/50"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  </li>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { signOut, user } = useAuth();
  
  // Auto collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const handleSignOut = async () => {
    await signOut();
  };

  const navItems = [
    {
      icon: <Database className="w-5 h-5" />,
      label: "Panel",
      to: "/",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "WhatsApp",
      to: "/whatsapp",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Productos Shopify",
      to: "/shopify",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Agentes OpenAI",
      to: "/agents",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Configuración",
      to: "/settings",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-200 ease-in-out flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          isMobile ? "shadow-xl" : ""
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-white" />
            <span className="ml-2 text-lg font-semibold text-white">
              Hub de WhatsApp
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-sidebar-accent"
            onClick={() => setSidebarOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="px-2 space-y-1">
            {navItems.map((item, idx) => (
              <SidebarItem
                key={idx}
                icon={item.icon}
                label={item.label}
                to={item.to}
                isActive={location.pathname === item.to}
              />
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer with User Info and Logout */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="text-sm text-white truncate">
                {user?.email || 'Usuario'}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-sidebar-accent"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <Button
            className="w-full bg-white hover:bg-white/90 text-primary"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nueva Conexión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 overflow-y-auto transition-all duration-200 relative",
          sidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        {/* Top header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </Button>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Ayuda
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSignOut}
              className="flex items-center space-x-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar sesión</span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
