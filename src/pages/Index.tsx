
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, BadgeDollarSign, Users, FileText, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-mapeo-600 to-mapeo-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Développez votre réseau immobilier avec MapeoRewards
              </h1>
              <p className="text-xl mb-8 text-white/80">
                Proposez des opportunités immobilières et soyez récompensé pour chaque transaction réussie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-mapeo-700 hover:bg-white/90">
                  <Link to="/signup">Devenir apporteur</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  <Link to="/signin">Se connecter</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" 
                   alt="Immobilier moderne" 
                   className="rounded-lg shadow-lg object-cover h-80 w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment ça fonctionne</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En trois étapes simples, devenez apporteur d'affaires et générez des revenus supplémentaires
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="bg-mapeo-50 text-mapeo-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Inscrivez-vous</h3>
              <p className="text-gray-600">
                Créez votre compte en quelques minutes et accédez à votre espace personnel
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="bg-mapeo-50 text-mapeo-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Proposez des leads</h3>
              <p className="text-gray-600">
                Soumettez les informations de contact de personnes intéressées par une vente immobilière
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="bg-mapeo-50 text-mapeo-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BadgeDollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Recevez vos commissions</h3>
              <p className="text-gray-600">
                Suivez la progression des dossiers et percevez vos commissions après chaque vente finalisée
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Pourquoi rejoindre MapeoRewards ?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-mapeo-100 rounded-full p-1">
                      <BarChart3 className="h-5 w-5 text-mapeo-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Suivi transparent</h3>
                    <p className="text-gray-600 mt-1">
                      Suivez en temps réel l'avancement de vos leads et leur statut
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-mapeo-100 rounded-full p-1">
                      <Building2 className="h-5 w-5 text-mapeo-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Partenaire immobilier fiable</h3>
                    <p className="text-gray-600 mt-1">
                      Travaillez avec une agence reconnue qui valorise votre contribution
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-mapeo-100 rounded-full p-1">
                      <BadgeDollarSign className="h-5 w-5 text-mapeo-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Commissions attractives</h3>
                    <p className="text-gray-600 mt-1">
                      Recevez des commissions compétitives pour chaque affaire concrétisée
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild className="group">
                  <Link to="/signup" className="flex items-center">
                    Rejoindre le réseau
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1606744824163-985d376605aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                  alt="Partenariat immobilier" 
                  className="w-full h-96 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-mapeo-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à générer des revenus complémentaires ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/80">
            Rejoignez notre réseau d'apporteurs d'affaires et transformez vos contacts en opportunités lucratives.
          </p>
          <Button asChild size="lg" className="bg-white text-mapeo-700 hover:bg-white/90">
            <Link to="/signup">Créer un compte gratuitement</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
