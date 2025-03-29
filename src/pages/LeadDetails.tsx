
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, CheckCircle, AlertCircle, Clock, FileText } from "lucide-react";
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
  email?: string;
  phone?: string;
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
      return User;
    case "Offre en cours":
      return FileText;
    case "Vendu":
      return CheckCircle;
    case "Annulé":
      return AlertCircle;
    default:
      return Clock;
  }
};

export default function LeadDetails() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les détails du lead depuis Supabase
  const fetchLeadDetails = async () => {
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
            email: "marie.dubois@example.com",
            phone: "06 12 34 56 78"
          },
          {
            id: "LD-2023-002",
            client: "Thomas Laurent",
            address: "45 Rue de la République, Lyon",
            status: "Visite programmée",
            submittedDate: "08/07/2023",
            description: "Maison de ville avec jardin",
            email: "thomas.laurent@example.com",
            phone: "07 23 45 67 89"
          },
          {
            id: "LD-2023-003",
            client: "Sophie Martin",
            address: "78 Boulevard Victor Hugo, Nice",
            status: "Offre en cours",
            submittedDate: "22/07/2023",
            description: "Studio proche de la plage",
            email: "sophie.martin@example.com",
            phone: "06 34 56 78 90"
          },
          {
            id: "LD-2023-004",
            client: "Alexandre Petit",
            address: "15 Place de la Comédie, Montpellier",
            status: "Vendu",
            submittedDate: "04/08/2023",
            commission: 2500,
            description: "Duplex en centre-ville",
            email: "alexandre.petit@example.com",
            phone: "07 45 67 89 01"
          },
          {
            id: "LD-2023-005",
            client: "Camille Leroy",
            address: "29 Rue des Carmes, Bordeaux",
            status: "Annulé",
            submittedDate: "17/08/2023",
            description: "Le client a changé d'avis",
            email: "camille.leroy@example.com",
            phone: "06 56 78 90 12"
          },
        ];
        
        const foundLead = mockLeads.find(lead => lead.id === id);
        
        if (foundLead) {
          setLead(foundLead);
        } else {
          toast.error("Lead non trouvé");
        }
        
        setLoading(false);
      }, 1000);

      /* Code à décommenter une fois l'intégration Supabase terminée
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setLead(data);
      } else {
        toast.error("Lead non trouvé");
      }
      */
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du lead:", error);
      toast.error("Impossible de charger les détails du lead. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLeadDetails();
    }
  }, [id]);

  // Fonction pour formater le statut avec l'icône
  const StatusBadge = ({ status }: { status: Lead["status"] }) => {
    const StatusIcon = getStatusIcon(status);
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
        <StatusIcon className="mr-1.5 h-4 w-4" />
        {status}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/leads">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Retour aux leads
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Détails du lead</h1>
        </div>

        {loading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-1/4 mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-24 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
        ) : lead ? (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{lead.client}</CardTitle>
                <CardDescription>ID: {lead.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={lead.status} />
                  {lead.commission && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600">
                      Commission: {lead.commission}€
                    </span>
                  )}
                </div>

                {lead.description && (
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-700">{lead.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Client</p>
                      <p className="text-gray-600">{lead.client}</p>
                    </div>
                  </div>

                  {lead.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">{lead.email}</p>
                      </div>
                    </div>
                  )}

                  {lead.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Téléphone</p>
                        <p className="text-gray-600">{lead.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-600">{lead.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Date de soumission</p>
                      <p className="text-gray-600">{lead.submittedDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-end gap-4">
                <Button variant="outline">Modifier</Button>
                <Button variant="secondary">Contacter</Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="py-10 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Lead non trouvé</h3>
              <p className="mt-2 text-sm text-gray-500">
                Le lead que vous recherchez n'existe pas ou a été supprimé.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link to="/leads">Retour aux leads</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
