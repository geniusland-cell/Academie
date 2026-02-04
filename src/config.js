// Configuration globale - Change l'ADN ici pour tester
// "1" = Fondateur (voit tout)
// "1.A" = Gérant A (voit Global et branche A complète: D et C)
// "1.A.D" = Leader D (voit Global, branche A du chef, mais PAS C)
// "1.A.C" = Leader C (voit Global, branche A du chef, mais PAS D)
// "1.B" = Gérant B (complètement séparé)
export const CURRENT_USER_ADN = "1.B";

// Utilisateurs pour la page de connexion
export const USERS = [
  {
    id: 1,
    name: "Fondateur A21",
    adn: "1",
    username: "fondateur",
    password: "admin123",
  },
  {
    id: 2,
    name: "Gérant A",
    adn: "1.A",
    username: "gerant_a",
    password: "test123",
  },
  {
    id: 3,
    name: "Leader D",
    adn: "1.A.D",
    username: "leader_d",
    password: "test123",
  },
  {
    id: 4,
    name: "Leader C",
    adn: "1.A.C",
    username: "leader_c",
    password: "test123",
  },
  {
    id: 5,
    name: "Gérant B",
    adn: "1.B",
    username: "gerant_b",
    password: "test123",
  },
];

// Données des leaders
export const getLeaderInfo = (userAdn) => {
  const leaders = {
    1: {
      name: "Fondateur A21",
      grade: "Fondateur",
      adn: "1",
      avatar: "https://via.placeholder.com/80?text=Fondateur",
      organization: "A21 MEDIA",
      logo: "/assets/logo.png",
      description: "Chef suprême - Vision globale",
      teamSize: 100,
      rank: "Fondateur",
    },
    "1.A": {
      name: "Gérant A",
      grade: "Gérant A",
      adn: "1.A",
      avatar: "https://via.placeholder.com/80?text=GerantA",
      organization: "A21 MEDIA",
      logo: "/assets/logo.png",
      description: "A21 = Full user nouvelle publication",
      teamSize: 12,
      rank: "Gérant",
    },
    "1.A.D": {
      name: "Leader D",
      grade: "Leader D",
      adn: "1.A.D",
      avatar: "https://via.placeholder.com/80?text=LeaderD",
      organization: "A21 MEDIA",
      logo: "/assets/logo.png",
      description: "Leader de l'équipe D",
      teamSize: 5,
      rank: "Leader",
    },
    "1.A.C": {
      name: "Leader C",
      grade: "Leader C",
      adn: "1.A.C",
      avatar: "https://via.placeholder.com/80?text=LeaderC",
      organization: "A21 MEDIA",
      logo: "/assets/logo.png",
      description: "Leader de l'équipe C",
      teamSize: 5,
      rank: "Leader",
    },
    "1.B": {
      name: "Gérant B",
      grade: "Gérant B",
      adn: "1.B",
      avatar: "https://via.placeholder.com/80?text=GerantB",
      organization: "A21 MEDIA",
      logo: "/assets/logo.png",
      description: "Branche B - Équipe indépendante",
      teamSize: 8,
      rank: "Gérant",
    },
  };

  return leaders[userAdn] || leaders["1.A"];
};

// ===== HELPER: Créer membre avec nationalité et photo =====
const createMember = (
  name,
  adn,
  role,
  status = "active",
  nationality = "RD Congo",
  flagEmoji = "🇨🇩",
) => {
  // Générer URL avatar basée sur le nom
  const encodedName = encodeURIComponent(name.replace(/\s+/g, "+"));
  return {
    name,
    adn,
    role,
    status,
    nationality,
    flagEmoji,
    photo: `https://ui-avatars.com/api/?name=${encodedName}&background=c41e3a&color=fff&bold=true`,
  };
};

// ===== DONNÉES DES 120 MEMBRES (SIMULATION) =====
// TODO: À remplacer par appel API backend Python
export const getAllMembers = () => {
  const members = [
    // Niveau 1: Fondateur
    createMember("Fondateur A21", "1", "Fondateur", "active", "RD Congo", "🇨🇩"),

    // Niveau 2: Gérants
    createMember("Gérant A (Chef)", "1.A", "Gérant", "active", "France", "🇫🇷"),
    createMember(
      "Gérant B (Chef)",
      "1.B",
      "Gérant",
      "active",
      "Belgique",
      "🇧🇪",
    ),
    createMember("Gérant C (Chef)", "1.C", "Gérant", "active", "Suisse", "🇨🇭"),

    // Niveau 3: Leaders sous 1.A
    createMember(
      "Leader D (Équipe D)",
      "1.A.D",
      "Leader",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Leader C (Équipe C)",
      "1.A.C",
      "Leader",
      "active",
      "France",
      "🇫🇷",
    ),

    // Sous-leaders 1.A.D
    createMember(
      "Chef Équipe D1",
      "1.A.D.1",
      "Chef Équipe",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Chef Équipe D2",
      "1.A.D.2",
      "Chef Équipe",
      "active",
      "France",
      "🇫🇷",
    ),

    // Membres 1.A.D.1
    createMember(
      "Jean Dupont",
      "1.A.D.1.1",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Marie Martin",
      "1.A.D.1.2",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Pierre Durand",
      "1.A.D.1.3",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Sophie Bernard",
      "1.A.D.1.4",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember("Luc Moreau", "1.A.D.1.5", "Membre", "active", "France", "🇫🇷"),
    createMember(
      "Anne Lefevre",
      "1.A.D.1.6",
      "Membre",
      "inactive",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Marc Garnier",
      "1.A.D.1.7",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Claire Leclerc",
      "1.A.D.1.8",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Olivier Blanc",
      "1.A.D.1.9",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Nathalie Petit",
      "1.A.D.1.10",
      "Membre",
      "inactive",
      "France",
      "🇫🇷",
    ),

    // Membres 1.A.D.2
    createMember(
      "Thomas Robert",
      "1.A.D.2.1",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Céline Ricard",
      "1.A.D.2.2",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Michaël Fournier",
      "1.A.D.2.3",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Julie Girard",
      "1.A.D.2.4",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "François Rousseau",
      "1.A.D.2.5",
      "Membre",
      "inactive",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Isabelle Vincent",
      "1.A.D.2.6",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "David Arnaud",
      "1.A.D.2.7",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Valérie Moulin",
      "1.A.D.2.8",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Sébastien Renard",
      "1.A.D.2.9",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Laure Gaultier",
      "1.A.D.2.10",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),

    // Sous-leaders 1.A.C
    createMember(
      "Chef Équipe C1",
      "1.A.C.1",
      "Chef Équipe",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Chef Équipe C2",
      "1.A.C.2",
      "Chef Équipe",
      "active",
      "France",
      "🇫🇷",
    ),

    // Membres 1.A.C.1
    createMember(
      "Raphaël Bonnet",
      "1.A.C.1.1",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Émilie Guerin",
      "1.A.C.1.2",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Gérard Fontaine",
      "1.A.C.1.3",
      "Membre",
      "inactive",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Hélène Marchand",
      "1.A.C.1.4",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Ingrid Schmitz",
      "1.A.C.1.5",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Julien Thierry",
      "1.A.C.1.6",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Karine Perrin",
      "1.A.C.1.7",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Laurent Doyen",
      "1.A.C.1.8",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Michelle Pasquier",
      "1.A.C.1.9",
      "Membre",
      "inactive",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Nicolas Hubert",
      "1.A.C.1.10",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),

    // Membres 1.A.C.2
    createMember(
      "Olivia Francois",
      "1.A.C.2.1",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember("Paul Meyer", "1.A.C.2.2", "Membre", "active", "France", "🇫🇷"),
    createMember(
      "Quentin Renaud",
      "1.A.C.2.3",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Rebecca Deschamps",
      "1.A.C.2.4",
      "Membre",
      "inactive",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Samuel Bouvier",
      "1.A.C.2.5",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Tiffany Maillard",
      "1.A.C.2.6",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Ulrich Chevallier",
      "1.A.C.2.7",
      "Membre",
      "active",
      "France",
      "🇫🇷",
    ),
    createMember(
      "Valerie Savard",
      "1.A.C.2.8",
      "Membre",
      "active",
      "Canada",
      "🇨🇦",
    ),
    createMember(
      "William Caron",
      "1.A.C.2.9",
      "Membre",
      "active",
      "Canada",
      "🇨🇦",
    ),
    createMember(
      "Yvette Potvin",
      "1.A.C.2.10",
      "Membre",
      "inactive",
      "Canada",
      "🇨🇦",
    ),

    // Branche 1.B (Gérant B)
    createMember(
      "Chef Équipe B1",
      "1.B.1",
      "Chef Équipe",
      "active",
      "Belgique",
      "🇧🇪",
    ),
    createMember(
      "Chef Équipe B2",
      "1.B.2",
      "Chef Équipe",
      "active",
      "Belgique",
      "🇧🇪",
    ),

    // Membres 1.B.1
    createMember(
      "Antoine Lacroix",
      "1.B.1.1",
      "Membre",
      "active",
      "Belgique",
      "🇧🇪",
    ),
    createMember(
      "Beatrice Faucher",
      "1.B.1.2",
      "Membre",
      "active",
      "Belgique",
      "🇧🇪",
    ),
    createMember(
      "Clement Neveu",
      "1.B.1.3",
      "Membre",
      "inactive",
      "Belgique",
      "🇧🇪",
    ),
    createMember(
      "Dominique Cote",
      "1.B.1.4",
      "Membre",
      "active",
      "Belgique",
      "🇧🇪",
    ),
    createMember(
      "Estelle Giroux",
      "1.B.1.5",
      "Membre",
      "active",
      "Belgique",
      "🇧🇪",
    ),
    createMember(
      "Fabrice Gagnon",
      "1.B.1.6",
      "Membre",
      "active",
      "Canada",
      "🇨🇦",
    ),
    createMember(
      "Gabrielle Jacques",
      "1.B.1.7",
      "Membre",
      "active",
      "Canada",
      "🇨🇦",
    ),
    createMember(
      "Henri Lalonde",
      "1.B.1.8",
      "Membre",
      "inactive",
      "Canada",
      "🇨🇦",
    ),
    createMember("Ines Leduc", "1.B.1.9", "Membre", "active", "Canada", "🇨🇦"),
    createMember(
      "Jacques Moreau",
      "1.B.1.10",
      "Membre",
      "active",
      "Canada",
      "🇨🇦",
    ),

    // Membres 1.B.2
    createMember(
      "Kristine Poirier",
      "1.B.2.1",
      "Membre",
      "active",
      "Canada",
      "🇨🇦",
    ),
    createMember("Laurent Roy", "1.B.2.2", "Membre", "active", "Canada", "🇨🇦"),
    createMember(
      "Martine Simard",
      "1.B.2.3",
      "Membre",
      "active",
      "Canada",
      "🇨🇦",
    ),
    createMember(
      "Nadine Tremblay",
      "1.B.2.4",
      "Membre",
      "inactive",
      "Canada",
      "🇨🇦",
    ),
    createMember(
      "Oscar Valentin",
      "1.B.2.5",
      "Membre",
      "active",
      "Belgique",
      "🇧🇪",
    ),
    createMember(
      "Pascale Varnier",
      "1.B.2.6",
      "Membre",
      "active",
      "Belgique",
      "🇧🇪",
    ),
    createMember(
      "Roseline Verdier",
      "1.B.2.7",
      "Membre",
      "active",
      "Belgique",
      "🇧🇪",
    ),
    createMember(
      "Serge Vermont",
      "1.B.2.8",
      "Membre",
      "active",
      "Belgique",
      "🇧🇪",
    ),
    createMember(
      "Therese Vidal",
      "1.B.2.9",
      "Membre",
      "inactive",
      "Belgique",
      "🇧🇪",
    ),
    createMember(
      "Urbain Vogt",
      "1.B.2.10",
      "Membre",
      "active",
      "Belgique",
      "🇧🇪",
    ),

    // Branche 1.C
    createMember(
      "Chef Équipe C3",
      "1.C.1",
      "Chef Équipe",
      "active",
      "Suisse",
      "🇨🇭",
    ),
    createMember(
      "Chef Équipe C4",
      "1.C.2",
      "Chef Équipe",
      "active",
      "Suisse",
      "🇨🇭",
    ),

    // Membres 1.C.1
    createMember(
      "Victor Wagner",
      "1.C.1.1",
      "Membre",
      "active",
      "Suisse",
      "🇨🇭",
    ),
    createMember("Wendy Walter", "1.C.1.2", "Membre", "active", "Suisse", "🇨🇭"),
    createMember(
      "Xavier Weber",
      "1.C.1.3",
      "Membre",
      "inactive",
      "Suisse",
      "🇨🇭",
    ),
    createMember(
      "Yves Weinberg",
      "1.C.1.4",
      "Membre",
      "active",
      "Suisse",
      "🇨🇭",
    ),
    createMember("Zoe Weiss", "1.C.1.5", "Membre", "active", "Suisse", "🇨🇭"),
    createMember(
      "André Wentworth",
      "1.C.1.6",
      "Membre",
      "active",
      "Allemagne",
      "🇩🇪",
    ),
    createMember(
      "Brigitte Wertheimer",
      "1.C.1.7",
      "Membre",
      "active",
      "Allemagne",
      "🇩🇪",
    ),
    createMember(
      "Christoph Wesley",
      "1.C.1.8",
      "Membre",
      "active",
      "Allemagne",
      "🇩🇪",
    ),
    createMember(
      "Denise West",
      "1.C.1.9",
      "Membre",
      "inactive",
      "Allemagne",
      "🇩🇪",
    ),
    createMember(
      "Etienne Wetherington",
      "1.C.1.10",
      "Membre",
      "active",
      "Allemagne",
      "🇩🇪",
    ),

    // Membres 1.C.2
    createMember(
      "Francoise Wetmore",
      "1.C.2.1",
      "Membre",
      "active",
      "Allemagne",
      "🇩🇪",
    ),
    createMember(
      "Gilles Whaley",
      "1.C.2.2",
      "Membre",
      "active",
      "Allemagne",
      "🇩🇪",
    ),
    createMember(
      "Hannah Wharton",
      "1.C.2.3",
      "Membre",
      "active",
      "Italie",
      "🇮🇹",
    ),
    createMember(
      "Ivan Wheatley",
      "1.C.2.4",
      "Membre",
      "inactive",
      "Italie",
      "🇮🇹",
    ),
    createMember(
      "Jacqueline Wheeler",
      "1.C.2.5",
      "Membre",
      "active",
      "Italie",
      "🇮🇹",
    ),
    createMember(
      "Kevin Wheldon",
      "1.C.2.6",
      "Membre",
      "active",
      "Italie",
      "🇮🇹",
    ),
    createMember(
      "Lucile Wherry",
      "1.C.2.7",
      "Membre",
      "active",
      "Italie",
      "🇮🇹",
    ),
    createMember("Monique Whey", "1.C.2.8", "Membre", "active", "Italie", "🇮🇹"),
    createMember(
      "Natalie Whickham",
      "1.C.2.9",
      "Membre",
      "inactive",
      "Italie",
      "🇮🇹",
    ),
    createMember(
      "Olivia Whildin",
      "1.C.2.10",
      "Membre",
      "active",
      "Italie",
      "🇮🇹",
    ),
  ];

  return members;
};

// Fonction: Get My Subordinates - Retourne SEULEMENT les subalternes de l'utilisateur
// Permet à chaque membre de voir son propre arbre uniquement
export const getMySubordinates = (userAdn) => {
  const allMembers = getAllMembers();

  // Filtrer les membres qui commencent par l'ADN de l'utilisateur
  // ET qui ne sont pas l'utilisateur lui-même
  return allMembers.filter(
    (member) => member.adn.startsWith(userAdn + ".") && member.adn !== userAdn,
  );
};

// Fonction: Build Hierarchy Tree - Construit l'arbre hiérarchique
export const buildHierarchyTree = (userAdn) => {
  const allMembers = getAllMembers();

  // Trouver l'utilisateur
  const currentUser = allMembers.find((m) => m.adn === userAdn);

  // Organiser les subalternes par niveau de profondeur
  const buildTree = (parentAdn) => {
    const parentMember = allMembers.find((m) => m.adn === parentAdn);

    // Trouver TOUS les enfants directs du parent (pas juste les subalternes du user initial)
    const allChildren = allMembers.filter((member) => {
      const parts = member.adn.split(".");
      const parentParts = parentAdn.split(".");
      // Direct subordinate si la profondeur est exactement +1
      return (
        parts.length === parentParts.length + 1 &&
        member.adn.startsWith(parentAdn + ".")
      );
    });

    return {
      ...parentMember,
      children: allChildren.map((child) => buildTree(child.adn)),
    };
  };

  return buildTree(userAdn);
};

// Fonction: Get Card Size - Retourne la taille de la carte selon le niveau ADN
export const getCardSize = (adn) => {
  const depth = adn.split(".").length;
  if (depth === 1) return 120; // Fondateur - le plus imposant
  if (depth === 2) return 110; // Gérants
  if (depth === 3) return 100; // Leaders
  return 90; // Membres et autres
};

// Fonction: Get Visible Posts - Retourne les publications visibles pour l'utilisateur
export const getVisiblePosts = (userAdn, publications) => {
  const userDepth = userAdn.split(".").length;

  return publications.filter((post) => {
    // Tous les posts publics sont visibles
    if (post.visibility === "publique") return true;

    // Les posts privés ne sont visibles que pour l'auteur
    if (post.visibility === "prive" && post.authorAdn === userAdn) return true;

    // Les posts de branche sont visibles pour les membres de la même branche
    if (post.visibility === "branche") {
      // Si l'utilisateur est le Fondateur (profondeur 1), il voit tout
      if (userDepth === 1) return true;

      // Extraire la branche de l'utilisateur et de l'auteur
      const userBranch = userAdn.split(".")[1]; // ex: "1.A.D" -> "A"
      const authorBranch = post.authorAdn.split(".")[1];
      return userBranch === authorBranch;
    }

    // Les posts "todos" (à faire) sont visibles pour les chefs directs
    if (post.visibility === "todos") {
      const userParts = userAdn.split(".");
      const authorParts = post.authorAdn.split(".");
      // Le chef direct est 1 niveau au-dessus
      if (userParts.length === authorParts.length - 1) {
        return (
          userAdn ===
          post.authorAdn.substring(0, post.authorAdn.lastIndexOf("."))
        );
      }
    }

    return false;
  });
};
