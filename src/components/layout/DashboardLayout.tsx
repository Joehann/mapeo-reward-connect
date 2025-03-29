
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";
import { Building2, LayoutDashboard, Users, FileText, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const navigation = [
    { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
    { name: "Mes Leads", href: "/leads", icon: Users },
    { name: "Nouveau Lead", href: "/leads/new", icon: FileText },
    { name: "Paramètres", href: "/profile", icon: Settings },
  ];

  const NavItem = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = location.pathname === item.href;
    
    return (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-md",
          isActive
            ? "bg-mapeo-50 text-mapeo-700 font-medium"
            : "text-gray-600 hover:bg-gray-100"
        )}
      >
        <item.icon className={cn("h-5 w-5", isActive ? "text-mapeo-700" : "text-gray-500")} />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r",
        isMobile ? "hidden" : "w-64 flex-shrink-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center px-6 border-b">
            <Link to="/" className="flex items-center">
              <Building2 className="h-6 w-6 text-mapeo-600" />
              <span className="ml-2 text-lg font-bold text-gray-900">MapeoRewards</span>
            </Link>
          </div>
          
          {/* Sidebar content */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavItem item={item} />
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Sidebar footer */}
          <div className="border-t p-4">
            <Link
              to="/logout"
              className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-600 rounded-md hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5 text-gray-500" />
              Déconnexion
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {isMobile && (
          <header className="bg-white border-b px-4 py-3">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <Building2 className="h-6 w-6 text-mapeo-600" />
                <span className="ml-2 text-lg font-bold text-gray-900">MapeoRewards</span>
              </Link>
              
              {/* Mobile nav would go here */}
            </div>
          </header>
        )}
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
