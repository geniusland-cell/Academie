import { User, LogOut } from "lucide-react";
import { getLeaderInfo } from "../config";

export const Profile = ({ onLogout }) => {
  // Récupère l'ADN du localStorage (défini à la connexion)
  const currentUserAdn = localStorage.getItem("userAdn") || "1";
  const userInfo = getLeaderInfo(currentUserAdn);

  return (
    <div className="page-content">
      <h1 className="flex items-center gap-2">
        <User
          size={32}
          strokeWidth={1.5}
          fill="none"
          className="text-gray-900"
        />
        Mon Profil
      </h1>
      <div className="profile-card">
        <div className="avatar">
          <User
            size={48}
            strokeWidth={1.5}
            fill="none"
            className="text-gray-600"
          />
        </div>
        <h2>{userInfo.name}</h2>
        <p>ADN: {userInfo.adn}</p>
        <p>Grade: {userInfo.grade}</p>
      </div>

      {/* Bouton Déconnexion */}
      <button
        onClick={onLogout}
        className="mt-6 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition font-semibold text-sm"
      >
        <LogOut size={18} strokeWidth={1.5} fill="none" />
        Déconnexion
      </button>
    </div>
  );
};
