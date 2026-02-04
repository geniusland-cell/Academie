import { Home, Bell, Plus, Users, User } from "lucide-react";

export const Navigation = ({ currentPage, onNavigate }) => {
  const tabs = [
    { id: "home", icon: Home, label: "Accueil" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "create", icon: Plus, label: "Créer" },
    { id: "organization", icon: Users, label: "Organisation" },
    { id: "profile", icon: User, label: "Profil" },
  ];

  return (
    <>
      {/* Sidebar pour desktop - FIXE */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-24 bg-white border-r border-gray-200 z-50">
        <nav className="flex flex-col gap-6 p-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`flex items-center justify-center px-4 py-4 rounded-lg transition-colors ${
                  currentPage === tab.id
                    ? "bg-red-50 text-red-600"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}
                title={tab.label}
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="flex-shrink-0"
                  fill="none"
                />
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Bottom bar pour mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around h-20 z-50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-0 transition-all flex-1 ${
                currentPage === tab.id ? "text-red-600" : "text-gray-400"
              }`}
              title={tab.label}
            >
              <Icon size={24} strokeWidth={1.5} fill="none" />
              <span
                className={`text-xs font-medium transition-colors whitespace-nowrap ${
                  currentPage === tab.id ? "text-red-600" : "text-gray-600"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
