import { PublicationCard } from "../components/PublicationCard";
import { Lock } from "lucide-react";
import { useState } from "react";
import { getVisiblePosts } from "../config";

export const FilActualite = () => {
  const [currentUserAdn] = useState(localStorage.getItem("userAdn") || "1");

  const publications = [
    {
      id: 1,
      author: "A21 MEDIA",
      avatar: "https://via.placeholder.com/44?text=A21",
      logo: "/assets/logo.png",
      text: "Le momento de Cotonou/Benin. Bienvenue celui de Brazzaville",
      image: "https://via.placeholder.com/400x300?text=Publication",
      timestamp: "11h",
      likes: 0,
      comments: 0,
      visibility: "publique",
      visibilityLabel: "Global",
      authorAdn: "1",
    },
    {
      id: 2,
      author: "Leader D",
      avatar: "https://via.placeholder.com/44?text=LD",
      logo: "/assets/logo.png",
      text: "Stratégie d'équipe pour ce trimestre",
      image: null,
      timestamp: "2h",
      likes: 5,
      comments: 2,
      visibility: "branche",
      visibilityLabel: "Branche 1.A.D",
      authorAdn: "1.A.D",
    },
    {
      id: 3,
      author: "Gérant A",
      avatar: "https://via.placeholder.com/44?text=GA",
      logo: "/assets/logo.png",
      text: "Rapport mensuel: tous les objectifs atteints!",
      image: null,
      timestamp: "5h",
      likes: 12,
      comments: 8,
      visibility: "branche",
      visibilityLabel: "Branche 1.A",
      authorAdn: "1.A",
    },
    {
      id: 4,
      author: "Leader C",
      avatar: "https://via.placeholder.com/44?text=LC",
      logo: "/assets/logo.png",
      text: "Résultats de l'équipe C ce mois-ci: excellent!",
      image: null,
      timestamp: "3h",
      likes: 8,
      comments: 4,
      visibility: "branche",
      visibilityLabel: "Branche 1.A.C",
      authorAdn: "1.A.C",
    },
    {
      id: 5,
      author: "Chef Équipe D1",
      avatar: "https://via.placeholder.com/44?text=CD1",
      logo: "/assets/logo.png",
      text: "Discussion confidentielle avec mon leader sur les objectifs",
      image: null,
      timestamp: "1h",
      likes: 0,
      comments: 0,
      visibility: "prive",
      visibilityLabel: "Privé (Chefs directs)",
      authorAdn: "1.A.D.1",
    },
    {
      id: 6,
      author: "Leader D",
      avatar: "https://via.placeholder.com/44?text=LD",
      logo: "/assets/logo.png",
      text: "Décision importante concernant la restructuration de l'équipe",
      image: null,
      timestamp: "30min",
      likes: 2,
      comments: 1,
      visibility: "prive",
      visibilityLabel: "Privé (Chefs directs)",
      authorAdn: "1.A.D",
    },
    {
      id: 7,
      author: "Gérant A",
      avatar: "https://via.placeholder.com/44?text=GA",
      logo: "/assets/logo.png",
      text: "Stratégie confidentielle pour les deux leaders sous ma responsabilité",
      image: null,
      timestamp: "15min",
      likes: 1,
      comments: 0,
      visibility: "prive",
      visibilityLabel: "Privé (Chefs directs)",
      authorAdn: "1.A",
    },
  ];

  const visiblePublications = getVisiblePosts(currentUserAdn, publications);

  return (
    <div className="p-6 w-full">
      <h1 className="text-xs font-bold text-gray-900 mb-8 text-center w-full">
        Academy Twenty One
      </h1>

      {/* Afficher l'ADN de l'utilisateur */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <p className="text-xs text-blue-600 font-semibold">
          Votre ADN: <span className="text-blue-800">{currentUserAdn}</span>
        </p>
      </div>

      <div className="space-y-4">
        {visiblePublications.length === 0 ? (
          <p className="text-center text-gray-500">
            Aucune publication visible
          </p>
        ) : (
          visiblePublications.map((pub) => (
            <div key={pub.id}>
              <PublicationCard publication={pub} />

              {/* Badge de visibilité */}
              <div className="flex items-center gap-1 mt-2 px-4 py-2 bg-gray-50 rounded">
                <Lock size={14} className="text-gray-600" />
                <p className="text-xs text-gray-600">
                  Visible pour:{" "}
                  <span className="font-semibold">{pub.visibilityLabel}</span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
