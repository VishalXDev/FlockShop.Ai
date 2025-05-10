import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

type Props = {
  id: string;
  name: string;
  createdBy: string;
  imageURL?: string;
  onDelete: (id: string) => void;
};

export default function WishlistCard({
  id,
  name,
  createdBy,
  imageURL,
  onDelete,
}: Props) {
  const { user } = useAuth();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation on Link click
    const confirmed = window.confirm(
      "Are you sure you want to delete this wishlist?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/wishlists/${id}`);
      onDelete(id);
    } catch (err: any) {
      console.error("Delete failed:", err.message);
      alert("Failed to delete wishlist.");
    }
  };

  return (
    <Link href={`/wishlist/${id}`}>
      <div className="bg-gray-900 border rounded-lg shadow hover:shadow-md transition-transform overflow-hidden cursor-pointer relative">
        {imageURL && (
          <img src={imageURL} alt={name} className="w-full h-40 object-cover" />
        )}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-1 text-white">{name}</h2>
          <p className="text-sm text-white">Created by: {createdBy}</p>
        </div>

        {user?.uid === createdBy && (
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700 z-10"
          >
            🗑️
          </button>
        )}
      </div>
    </Link>
  );
}
