
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, FileText, CheckCircle, AlertCircle, Clock, BarChart3 } from "lucide-react";
import { toast } from "sonner";

// Type pour un lead
interface Lead {
  id: string;
  client: string;
  address: string;
  status: "En contact" | "Visite programmée" | "Offre en cours" | "Vendu" | "Annulé";
  submittedDate: string;
  commission?: number;
  description?: string;
}

// Fonction pour obtenir la couleur correspondant au statut
const getStatusColor = (status: Lead["status"]) => {
  switch (status) {
    case "En contact":
      return "text-yellow-600 bg-yellow-50";
    case "Visite programmée":
      return "text-blue-600 bg-blue-50";
    case "Offre en cours":
      return "text-indigo-600 bg-indigo-50";
    case "Vendu":
      return "text-green-600 bg-green-50";
    case "Annulé":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

// Fonction pour obtenir l'icône correspondant au statut
const getStatusIcon = (status: Lead["status"]) => {
  switch (status) {
    case "En contact":
      return Clock;
    case "Visite programmée":
      return Users;
    case "Offre en cours":
      return FileText;
    case "Vendu":
      return CheckCircle;
    case "Annulé":
      return AlertCircle;
    default:
      return BarChart3;
  }
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les leads depuis Supabase
  const fetchLeads = async () => {
    setLoading(true);
    try {
      // TODO: Remplacer par un appel réel à Supabase une fois l'intégration terminée
      // Simulation d'un appel API avec un délai
      setTimeout(() => {
        // Données fictives en attendant l'intégration avec Supabase
        const mockLeads: Lead[] = [
          {
            id: "LD-2023-001",
            client: "Marie Dubois",
            address: "123 Avenue des Champs-Élysées, Paris",
            status: "En contact",
            submittedDate: "15/06/2023",
            description: "Appartement 3 pièces avec vue sur la Tour Eiffel",
          },
          {
            id: "LD-2023-002",
            client: "Thomas Laurent",
            address: "45 Rue de la République, Lyon",
            status: "Visite programmée",
            submittedDate: "08/07/2023",
            description: "Maison de ville avec jardin",
          },
          {
            id: "LD-2023-003",
            client: "Sophie Martin",
            address: "78 Boulevard Victor Hugo, Nice",
            status: "Offre en cours",
            submittedDate: "22/07/2023",
            description: "Studio proche de la plage",
          },
          {
            id: "LD-2023-004",
            client: "Alexandre Petit",
            address: "15 Place de la Comédie, Montpellier",
            status: "Vendu",
            submittedDate: "04/08/2023",
            commission: 2500,
            description: "Duplex en centre-ville",
          },
          {
            id: "LD-2023-005",
            client: "Camille Leroy",
            address: "29 Rue des Carmes, Bordeaux",
            status: "Annulé",
            submittedDate: "17/08/2023",
            description: "Le client a changé d'avis",
          },
        ];
        setLeads(mockLeads);
        setLoading(false);
      }, 1000);

      /* Code à décommenter une fois l'intégration Supabase terminée
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setLeads(data || []);
      */
    } catch (error) {
      console.error("Erreur lors de la récupération des leads:", error);
      toast.error("Impossible de charger vos leads. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mes Leads</h1>
            <p className="text-muted-foreground">
              Gérez vos leads et suivez leur progression
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button asChild>
              <Link to="/leads/new">Soumettre un nouveau lead</Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des leads</CardTitle>
            <CardDescription>
              Tous vos leads soumis et leur statut actuel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-10">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun lead</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Vous n'avez pas encore soumis de leads.
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link to="/leads/new">Soumettre un nouveau lead</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Adresse</TableHead>
                      <TableHead>Date de soumission</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => {
                      const StatusIcon = getStatusIcon(lead.status);
                      return (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.id}</TableCell>
                          <TableCell>{lead.client}</TableCell>
                          <TableCell>{lead.address}</TableCell>
                          <TableCell>{lead.submittedDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                <StatusIcon className="mr-1 h-3 w-3" />
                                {lead.status}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/leads/${lead.id}`}>Détails</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
