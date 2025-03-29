
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock Supabase client (TODO: replace with real Supabase client)
const mockUploadDocument = async (file: File): Promise<{data: any, error: any}> => {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock successful upload
  return {
    data: { path: `id_documents/${file.name}` },
    error: null
  };
};

// Mock update profile status
const mockUpdateUserStatus = async (status: string): Promise<{data: any, error: any}> => {
  // Simulate update delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock successful update
  return {
    data: { status },
    error: null
  };
};

interface VerificationUploadProps {
  status: string;
  onStatusUpdate: (newStatus: string) => void;
}

export function VerificationUpload({ status, onStatusUpdate }: VerificationUploadProps) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Aucun fichier sélectionné",
        description: "Veuillez sélectionner un document d'identité à télécharger.",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    try {
      // TODO: Replace with real Supabase client
      const { error } = await mockUploadDocument(file);
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Update user status
      const { error: updateError } = await mockUpdateUserStatus("pending");
      
      if (updateError) {
        throw new Error(updateError.message);
      }
      
      onStatusUpdate("pending");
      
      toast({
        title: "Document envoyé avec succès",
        description: "Votre document d'identité a été envoyé et est en attente de validation.",
      });
    } catch (error) {
      toast({
        title: "Erreur lors de l'envoi",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'envoi du document.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const renderUploadForm = () => (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-2">
          <label htmlFor="file-upload" className="cursor-pointer text-mapeo-600 hover:text-mapeo-500">
            <span>Cliquez pour sélectionner un fichier</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Formats acceptés: JPG, PNG, PDF. Taille max: 5MB
        </p>
      </div>
      
      {file && (
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
          </div>
          <Button 
            onClick={handleUpload} 
            disabled={uploading}
          >
            {uploading ? "Envoi en cours..." : "Envoyer"}
          </Button>
        </div>
      )}
    </div>
  );
  
  const renderStatusMessage = () => {
    switch (status) {
      case "pending":
        return (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>En attente de validation</AlertTitle>
            <AlertDescription>
              Votre document d'identité a été envoyé et est en cours d'examen. 
              Vous serez notifié une fois la vérification terminée.
            </AlertDescription>
          </Alert>
        );
      case "validated":
        return (
          <Alert>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>Compte vérifié</AlertTitle>
            <AlertDescription>
              Votre compte a été vérifié avec succès. Vous pouvez maintenant 
              soumettre des leads et accéder à toutes les fonctionnalités.
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vérification d'identité</CardTitle>
        <CardDescription>
          Pour soumettre des leads et recevoir des commissions, veuillez 
          vérifier votre identité en téléchargeant une pièce d'identité.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "waiting_for_doc" ? renderUploadForm() : renderStatusMessage()}
      </CardContent>
    </Card>
  );
}
