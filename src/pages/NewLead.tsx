
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { InfoIcon } from "lucide-react";

const propertyTypes = [
  "Appartement",
  "Maison",
  "Villa",
  "Terrain",
  "Local commercial",
  "Immeuble",
  "Autre",
];

const NewLead = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    clientFirstName: "",
    clientLastName: "",
    clientEmail: "",
    clientPhone: "",
    propertyAddress: "",
    propertyCity: "",
    propertyZip: "",
    propertyType: "",
    propertySize: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Intégrer avec Supabase
      console.log("Form data:", formData);
      
      toast({
        title: "Lead soumis avec succès",
        description: "Nous avons bien reçu votre proposition de lead.",
      });
      
      // Reset form
      setFormData({
        clientFirstName: "",
        clientLastName: "",
        clientEmail: "",
        clientPhone: "",
        propertyAddress: "",
        propertyCity: "",
        propertyZip: "",
        propertyType: "",
        propertySize: "",
        notes: "",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-6">Proposer un nouveau lead</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Informations sur le vendeur potentiel</CardTitle>
            <CardDescription>
              Renseignez les informations du propriétaire intéressé par une vente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Information du client */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Coordonnées du vendeur</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientFirstName">Prénom</Label>
                    <Input
                      id="clientFirstName"
                      name="clientFirstName"
                      value={formData.clientFirstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="clientLastName">Nom</Label>
                    <Input
                      id="clientLastName"
                      name="clientLastName"
                      value={formData.clientLastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Email</Label>
                    <Input
                      id="clientEmail"
                      name="clientEmail"
                      type="email"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone">Téléphone</Label>
                    <Input
                      id="clientPhone"
                      name="clientPhone"
                      type="tel"
                      value={formData.clientPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Information sur le bien */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Informations sur le bien</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="propertyAddress">Adresse</Label>
                  <Input
                    id="propertyAddress"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyCity">Ville</Label>
                    <Input
                      id="propertyCity"
                      name="propertyCity"
                      value={formData.propertyCity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyZip">Code postal</Label>
                    <Input
                      id="propertyZip"
                      name="propertyZip"
                      value={formData.propertyZip}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Type de bien</Label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="" disabled>
                        Sélectionnez un type
                      </option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertySize">Surface (m²)</Label>
                    <Input
                      id="propertySize"
                      name="propertySize"
                      type="number"
                      value={formData.propertySize}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Informations complémentaires</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Détails sur le bien, la situation du vendeur, etc."
                  />
                </div>
              </div>
              
              {/* Avertissement et bouton de soumission */}
              <div className="pt-4 border-t">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <InfoIcon className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                      <div className="text-sm text-yellow-700">
                        <p>
                          En soumettant ce lead, vous confirmez avoir obtenu l'accord de la personne concernée pour que nous la contactions au sujet de son projet immobilier.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Soumettre le lead
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NewLead;
