import { useEffect, useState } from "react";
import axios from "axios";
import AddWishlistModal from "../components/AddWishlistModal";
import WishlistCard from "../components/WishlistCard";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

type Wishlist = {
  _id: string;
  name: string;
  createdBy: string;
  imageURL?: string;
};

const getEmojiForName = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes("bike")) return "🏍️";
  if (lower.includes("car")) return "🚗";
  if (lower.includes("book")) return "📚";
  if (lower.includes("trip") || lower.includes("travel")) return "✈️";
  if (lower.includes("home") || lower.includes("house")) return "🏠";
  if (lower.includes("gaming") || lower.includes("game")) return "🎮";
  if (lower.includes("tech") || lower.includes("gadget")) return "💻";
  if (lower.includes("fashion") || lower.includes("clothes")) return "👗";
  if (lower.includes("food") || lower.includes("restaurant")) return "🍕";
  if (lower.includes("phone")) return "📱";
  if (lower.includes("camera")) return "📷";
  if (lower.includes("watch")) return "⌚";
  if (lower.includes("jewelry") || lower.includes("ring")) return "💍";
  if (lower.includes("furniture")) return "🛋️";
  if (lower.includes("pet") || lower.includes("dog") || lower.includes("cat")) return "🐶";
  if (lower.includes("shoes")) return "👟";
  if (lower.includes("makeup")) return "💄";
  if (lower.includes("perfume")) return "🧴";
  if (lower.includes("art")) return "🎨";
  if (lower.includes("music")) return "🎵";
  if (lower.includes("guitar")) return "🎸";
  if (lower.includes("drum")) return "🥁";
  if (lower.includes("camera")) return "📸";
  if (lower.includes("movie")) return "🎬";
  if (lower.includes("ticket")) return "🎟️";
  if (lower.includes("sports")) return "🏅";
  if (lower.includes("soccer")) return "⚽";
  if (lower.includes("basketball")) return "🏀";
  if (lower.includes("laptop")) return "💻";
  if (lower.includes("tablet")) return "📱";
  if (lower.includes("headphone")) return "🎧";
  if (lower.includes("drone")) return "🚁";
  if (lower.includes("tv")) return "📺";
  if (lower.includes("plant")) return "🪴";
  if (lower.includes("garden")) return "🌱";
  if (lower.includes("toy")) return "🧸";
  if (lower.includes("baby")) return "👶";
  if (lower.includes("gift")) return "🎁";
  if (lower.includes("spa")) return "💆";
  if (lower.includes("vacation")) return "🏖️";
  if (lower.includes("beach")) return "🏝️";
  if (lower.includes("mountain")) return "🏔️";
  if (lower.includes("camping")) return "🏕️";
  if (lower.includes("hotel")) return "🏨";
  if (lower.includes("flight")) return "🛫";
  if (lower.includes("concert")) return "🎤";
  if (lower.includes("festival")) return "🎉";
  if (lower.includes("coffee")) return "☕";
  if (lower.includes("tea")) return "🍵";
  if (lower.includes("bicycle")) return "🚴";
  if (lower.includes("skateboard")) return "🛹";
  if (lower.includes("scooter")) return "🛴";
  if (lower.includes("helmet")) return "⛑️";
  return "🎁";
};

export default function Dashboard() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user]);

  const fetchWishlists = async () => {
    try {
      const res = await axios.get<Wishlist[]>("http://localhost:5000/api/wishlists");
      setWishlists(res.data);
      setError("");
    } catch (err: any) {
      console.error("Error fetching wishlists:", err.message);
      setError("Failed to load wishlists.");
    }
  };

  const handleDelete = (id: string) => {
    setWishlists((prev) => prev.filter((w) => w._id !== id));
  };

  useEffect(() => {
    if (user) {
      fetchWishlists();
    }
  }, [user]);

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-white">
          Dream❤️ Wishlists🛒
        </h1>
        <div className="flex gap-2">
          <AddWishlistModal onSuccess={fetchWishlists} />
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {wishlists.length === 0 ? (
        <p className="text-gray-300">No wishlists yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlists.map((w) => (
            <WishlistCard
              key={w._id}
              id={w._id}
              name={`${w.name} ${getEmojiForName(w.name)}`}
              createdBy={w.createdBy}
              imageURL={w.imageURL}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
