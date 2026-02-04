export const RightPanel = ({ leader, show = true }) => {
  if (!show) return null;

  return (
    <aside className="hidden xl:flex flex-col gap-6 w-80 p-6 bg-white h-screen sticky top-0">
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-300 overflow-hidden">
          <img
            src={leader.avatar}
            alt={leader.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{leader.name}</h2>
        <p className="text-sm font-semibold text-red-600 mt-2">
          {leader.grade}
        </p>
        <p className="text-xs text-gray-600 mt-2">ADN: {leader.adn}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm text-center">
        <img
          src={leader.logo}
          alt="Organization"
          className="w-8 h-8 mx-auto mb-3 object-contain"
        />
        <h3 className="font-semibold text-gray-900 text-sm">
          {leader.organization}
        </h3>
        <p className="text-xs text-gray-600 mt-2 leading-relaxed">
          {leader.description}
        </p>
      </div>
    </aside>
  );
};
