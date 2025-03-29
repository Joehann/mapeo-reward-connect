
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, CheckIcon, Copy, Edit2, Save, User } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    address: "123 Rue de Paris",
    city: "Paris",
    zipCode: "75001",
    iban: "FR76 3000 4000 0100 0000 0000 000",
  });

  const [bankData, setBankData] = useState({
    iban: "FR76 3000 4000 0100 0000 0000 000",
    bicSwift: "BNPAFRPP",
    bankName: "BNP Paribas",
    accountHolder: "Jean Dupont",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Intégrer avec Supabase
      setIsEditing(false);
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleBankSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Intégrer avec Supabase
      toast({
        title: "Informations bancaires mises à jour",
        description: "Vos coordonnées bancaires ont été mises à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié !",
      description: "Le texte a été copié dans le presse-papier.",
    });
  };

  // Exemple de transactions
  const transactions = [
    {
      id: "TRX-001",
      date: "15/08/2023",
      amount: 850,
      status: "Payée",
      leadId: "LD-2023-001",
      property: "123 Avenue des Champs-Élysées, Paris",
    },
    {
      id: "TRX-002",
      date: "22/09/2023",
      amount: 1200,
      status: "Payée",
      leadId: "LD-2023-004",
      property: "15 Place de la Comédie, Montpellier",
    },
    {
      id: "TRX-003",
      date: "10/10/2023",
      amount: 800,
      status: "En attente",
      leadId: "LD-2023-003",
      property: "78 Boulevard Victor Hugo, Nice",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Mon Profil</h1>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="bank">Coordonnées bancaires</TabsTrigger>
            <TabsTrigger value="transactions">Mes commissions</TabsTrigger>
          </TabsList>
          
          {/* Onglet Profil */}
          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Gérez vos informations de contact et votre profil
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Modifier
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="flex justify-center mb-6">
                    <div className="text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarImage src="https://i.pravatar.cc/150?u=jd@example.com" alt="Avatar" />
                        <AvatarFallback>
                          <User className="h-12 w-12" />
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="text-xl font-semibold">
                        {profileData.firstName} {profileData.lastName}
                      </div>
                      <div className="text-sm text-gray-500">Apporteur d'affaires</div>
                      <div className="text-sm text-gray-500 flex items-center justify-center mt-1">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        Membre depuis Juin 2023
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        name="city"
                        value={profileData.city}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Code postal</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={profileData.zipCode}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end">
                      <Button type="submit">Enregistrer les modifications</Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Onglet Coordonnées Bancaires */}
          <TabsContent value="bank">
            <Card>
              <CardHeader>
                <CardTitle>Coordonnées bancaires</CardTitle>
                <CardDescription>
                  Gérez vos informations bancaires pour recevoir vos commissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBankSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="iban">IBAN</Label>
                    <div className="flex">
                      <Input
                        id="iban"
                        name="iban"
                        value={bankData.iban}
                        onChange={handleBankChange}
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(bankData.iban)}
                        className="ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bicSwift">BIC / SWIFT</Label>
                    <Input
                      id="bicSwift"
                      name="bicSwift"
                      value={bankData.bicSwift}
                      onChange={handleBankChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Nom de la banque</Label>
                      <Input
                        id="bankName"
                        name="bankName"
                        value={bankData.bankName}
                        onChange={handleBankChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="accountHolder">Titulaire du compte</Label>
                      <Input
                        id="accountHolder"
                        name="accountHolder"
                        value={bankData.accountHolder}
                        onChange={handleBankChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Enregistrer</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Onglet Transactions */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Historique des commissions</CardTitle>
                <CardDescription>
                  Consultez les commissions reçues et en attente pour vos leads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3">ID Transaction</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Lead</th>
                        <th scope="col" className="px-6 py-3">Bien</th>
                        <th scope="col" className="px-6 py-3">Montant</th>
                        <th scope="col" className="px-6 py-3">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{transaction.id}</td>
                          <td className="px-6 py-4">{transaction.date}</td>
                          <td className="px-6 py-4">{transaction.leadId}</td>
                          <td className="px-6 py-4">{transaction.property}</td>
                          <td className="px-6 py-4">{transaction.amount} €</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              transaction.status === "Payée"
                                ? "bg-green-50 text-green-600"
                                : "bg-yellow-50 text-yellow-600"
                            }`}>
                              {transaction.status}
                              {transaction.status === "Payée" && (
                                <CheckIcon className="inline-block ml-1 h-3 w-3" />
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-md border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Total des commissions</p>
                      <p className="text-gray-500 text-xs">Montant total perçu à ce jour</p>
                    </div>
                    <div className="text-xl font-bold">2 850 €</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
