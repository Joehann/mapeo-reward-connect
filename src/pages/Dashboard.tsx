
import { BarChart3, Users, BadgeDollarSign, Building2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Exemple de données pour les cards de statistiques et leads
const stats = [
  {
    title: "Total des leads",
    value: "12",
    icon: Users,
    description: "3 nouveaux ce mois-ci",
    color: "bg-blue-500",
  },
  {
    title: "Leads actifs",
    value: "5",
    icon: Building2,
    description: "En cours de traitement",
    color: "bg-yellow-500",
  },
  {
    title: "Leads convertis",
    value: "7",
    icon: BarChart3,
    description: "58% de taux de conversion",
    color: "bg-green-500",
  },
  {
    title: "Commissions gagnées",
    value: "2 850 €",
    icon: BadgeDollarSign,
    description: "Total à ce jour",
    color: "bg-purple-500",
  },
];

// Données d'exemple pour les leads récents
const recentLeads = [
  {
    id: "LD-2023-001",
    client: "Marie Dubois",
    address: "123 Avenue des Champs-Élysées, Paris",
    status: "En contact",
    submittedDate: "15/06/2023",
    statusColor: "text-yellow-600 bg-yellow-50",
  },
  {
    id: "LD-2023-002",
    client: "Thomas Laurent",
    address: "45 Rue de la République, Lyon",
    status: "Visite programmée",
    submittedDate: "08/07/2023",
    statusColor: "text-blue-600 bg-blue-50",
  },
  {
    id: "LD-2023-003",
    client: "Sophie Martin",
    address: "78 Boulevard Victor Hugo, Nice",
    status: "Offre en cours",
    submittedDate: "22/07/2023",
    statusColor: "text-indigo-600 bg-indigo-50",
  },
  {
    id: "LD-2023-004",
    client: "Alexandre Petit",
    address: "15 Place de la Comédie, Montpellier",
    status: "Vendu",
    submittedDate: "04/08/2023",
    statusColor: "text-green-600 bg-green-50",
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête de bienvenue */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Bienvenue sur votre espace MapeoRewards. Voici un aperçu de vos activités.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button asChild>
              <Link to="/leads/new">Soumettre un nouveau lead</Link>
            </Button>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.color} text-white p-2 rounded-md`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground pt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tableau des leads récents */}
        <Card>
          <CardHeader>
            <CardTitle>Leads récents</CardTitle>
            <CardDescription>
              Vos derniers leads soumis et leur statut actuel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Client</th>
                    <th scope="col" className="px-6 py-3">Adresse</th>
                    <th scope="col" className="px-6 py-3">Date de soumission</th>
                    <th scope="col" className="px-6 py-3">Statut</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{lead.id}</td>
                      <td className="px-6 py-4">{lead.client}</td>
                      <td className="px-6 py-4">{lead.address}</td>
                      <td className="px-6 py-4">{lead.submittedDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${lead.statusColor}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/leads/${lead.id}`}>Détails</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Voir tous les leads */}
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link to="/leads">Voir tous les leads</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
