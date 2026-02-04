import { Heart, MessageCircle, Send } from "lucide-react";

export const PublicationCard = ({ publication }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        {publication.logo && (
          <img
            src={publication.logo}
            alt="logo"
            className="w-11 h-11 rounded-full bg-gray-200 object-contain"
          />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-gray-900">
            {publication.author}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{publication.timestamp}</p>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-800 leading-relaxed mb-3">
          {publication.text}
        </p>
        {publication.image && (
          <img
            src={publication.image}
            alt="publication"
            className="w-full h-64 object-cover rounded-lg bg-gray-200"
          />
        )}
      </div>

      <div className="flex items-center gap-1 p-3 border-t border-gray-100">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors text-sm">
          <Heart size={18} strokeWidth={1.5} fill="none" />
          <span>{publication.likes}</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm">
          <MessageCircle size={18} strokeWidth={1.5} fill="none" />
          <span>{publication.comments}</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors text-sm">
          <Send size={18} strokeWidth={1.5} fill="none" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};
