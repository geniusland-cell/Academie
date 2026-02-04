import { Bell } from "lucide-react";

export const Notifications = () => {
  return (
    <div className="page-content">
      <h1 className="flex items-center gap-2">
        <Bell
          size={32}
          strokeWidth={1.5}
          fill="none"
          className="text-gray-900"
        />
        Notifications
      </h1>
      <p>Vous n'avez pas de nouvelles notifications</p>
    </div>
  );
};
