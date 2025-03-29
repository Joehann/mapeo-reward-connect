
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Building2 className="h-6 w-6 text-mapeo-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">MapeoRewards</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <Link to="/terms" className="text-sm text-gray-600 hover:text-mapeo-600">
              Conditions d'utilisation
            </Link>
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-mapeo-600">
              Politique de confidentialité
            </Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-mapeo-600">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MapeoRewards. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
