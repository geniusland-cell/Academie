import { Plus, Globe, Building2, Lock } from "lucide-react";

export const Create = () => {
  return (
    <div className="page-content">
      <h1 className="flex items-center gap-2">
        <Plus
          size={32}
          strokeWidth={1.5}
          fill="none"
          className="text-gray-900"
        />
        Créer une publication
      </h1>
      <form className="create-form">
        <textarea placeholder="Que voulez-vous partager ?" rows="5"></textarea>
        <select>
          <option>🌍 Visible pour tous</option>
          <option>🏢 Visible pour ma branche</option>
          <option>🔒 Privé (Leaders)</option>
        </select>
        <button type="submit">Publier</button>
      </form>
    </div>
  );
};
