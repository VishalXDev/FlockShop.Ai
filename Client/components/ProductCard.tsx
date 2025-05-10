import { useAuth } from "../context/AuthContext";
import api from "../services/api";

type Reaction = { emoji: string; by: string };
type Comment = { text: string; by: string };

type Props = {
  product: {
    _id: string;
    name: string;
    imageURL: string;
    price: number;
    addedBy: string;
    reactions?: Reaction[];
    comments?: Comment[];
  };
  refresh: () => void;
};

export default function ProductCard({ product, refresh }: Props) {
  const { user } = useAuth();

  const handleReact = async (emoji: string) => {
    if (!user?.uid) return;
    try {
      await api.post(`/products/${product._id}/react`, {
        emoji,
        by: user.uid,
      });
      refresh();
    } catch (err: any) {
      console.error("Reaction failed:", err.response?.data || err.message);
      alert("Failed to react to product.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await api.delete(`/products/${product._id}`);
      refresh();
    } catch (err: any) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete product.");
    }
  };

  const groupedReactions =
    product.reactions?.reduce<Record<string, number>>((acc, r) => {
      acc[r.emoji] = (acc[r.emoji] || 0) + 1;
      return acc;
    }, {}) || {};

    return (
      <div className="relative bg-white rounded-2xl p-4 flex flex-col gap-3 border-2 border-transparent group shadow-lg hover:shadow-2xl transition">
    
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl z-[-1] bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 blur-md opacity-50 animate-glow group-hover:opacity-90 transition-opacity"></div>
        
        {/* Image */}
        <div className="w-full h-40 overflow-hidden rounded-lg shadow-sm">
          <img
            src={product.imageURL}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
    
        {/* Product Info */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
            <p className="text-md font-medium text-green-600">₹{product.price}</p>
          </div>
          <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
            👤 {product.addedBy}
          </div>
        </div>
    
        {/* Emoji Reactions */}
        <div className="flex items-center gap-3">
          {["❤️", "😂", "🔥"].map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleReact(emoji)}
              className="text-xl hover:scale-110 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
    
        {/* Grouped Reactions */}
        {Object.keys(groupedReactions).length > 0 && (
          <div className="text-sm text-gray-700 flex flex-wrap gap-2 mt-1">
            {Object.entries(groupedReactions).map(([emoji, count]) => (
              <span key={emoji}>
                {emoji} x{count}
              </span>
            ))}
          </div>
        )}
    
        {/* Comments */}
        {product.comments?.length ? (
          <div className="text-sm mt-2 text-gray-600 space-y-1">
            {product.comments.slice(0, 2).map((c, i) => (
              <div key={i}>
                💬 <b>{c.by}</b>: {c.text}
              </div>
            ))}
            {product.comments.length > 2 && (
              <p className="text-xs text-blue-600 cursor-pointer">View all comments</p>
            )}
          </div>
        ) : null}
    
        {/* Delete Button */}
        {user?.uid === product.addedBy && (
          <button
            className="mt-3 text-sm text-red-600 hover:underline self-start"
            onClick={handleDelete}
          >
            🗑️ Remove Product
          </button>
        )}
      </div>
    );    
}
