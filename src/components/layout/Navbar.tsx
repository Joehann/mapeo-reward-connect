
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Building2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-mapeo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MapeoRewards</span>
            </Link>
          </div>

          {isMobile ? (
            <>
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mapeo-600"
              >
                <span className="sr-only">Ouvrir le menu</span>
                {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
              
              {isMenuOpen && (
                <div className="absolute inset-x-0 top-16 z-10 bg-white shadow-md">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link to="/dashboard" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-mapeo-600">
                      Dashboard
                    </Link>
                    <Link to="/leads/new" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-mapeo-600">
                      Nouveau Lead
                    </Link>
                    <Link to="/profile" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-mapeo-600">
                      Mon Profil
                    </Link>
                    <div className="mt-4 flex flex-col space-y-2 px-3">
                      <Button asChild variant="outline">
                        <Link to="/signin">Connexion</Link>
                      </Button>
                      <Button asChild>
                        <Link to="/signup">Inscription</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-mapeo-600">
                  Dashboard
                </Link>
                <Link to="/leads/new" className="text-gray-600 hover:text-mapeo-600">
                  Nouveau Lead
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-mapeo-600">
                  Mon Profil
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Button asChild variant="outline">
                  <Link to="/signin">Connexion</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Inscription</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
