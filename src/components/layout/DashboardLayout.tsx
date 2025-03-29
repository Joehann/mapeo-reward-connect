
import { ReactNode, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";
import { Building2, LayoutDashboard, Users, FileText, Settings, LogOut, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVerificationStatus } from "@/hooks/use-verification-status";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const location = useLocation();
  const { status, updateStatus } = useVerificationStatus();
  
  // Détermine les éléments de navigation en fonction du statut de vérification
  const getNavigation = () => {
    // Éléments de base toujours présents
    const baseNavigation = [
      { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard }
    ];
    
    // Éléments réservés aux utilisateurs vérifiés
    const verifiedNavigation = [
      { name: "Mes Leads", href: "/leads", icon: Users },
      { name: "Nouveau Lead", href: "/leads/new", icon: FileText },
    ];
    
    // Éléments toujours présents à la fin
    const endNavigation = [
      { name: "Paramètres", href: "/profile", icon: Settings },
    ];
    
    // Combine les éléments en fonction du statut
    return [
      ...baseNavigation,
      ...(status === "validated" ? verifiedNavigation : []),
      ...endNavigation
    ];
  };
  
  const navigation = getNavigation();

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

  // Bouton temporaire pour changer le statut (pour la démo)
  const StatusSwitcher = () => {
    const statusOptions = [
      { value: "waiting_for_doc", label: "En attente de document" },
      { value: "pending", label: "En cours de validation" },
      { value: "validated", label: "Validé" },
      { value: "rejected", label: "Rejeté" }
    ];

    return (
      <div className="px-4 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              <span className="truncate">Changer le statut (démo)</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {statusOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => updateStatus(option.value as any)}
                className={cn(
                  "cursor-pointer",
                  status === option.value && "font-bold"
                )}
              >
                {option.label}
                {status === option.value && " (actuel)"}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
          
          {/* Statut actuel */}
          <div className="border-t p-2">
            <div className="text-xs text-gray-500 mb-2 px-2">
              Statut actuel: {status === "waiting_for_doc" ? "En attente de document" : 
                             status === "pending" ? "En cours de validation" : 
                             status === "validated" ? "Validé" : 
                             status === "rejected" ? "Rejeté" : status}
            </div>
            <StatusSwitcher />
          </div>
          
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
