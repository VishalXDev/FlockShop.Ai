import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

type Props = {
  onSuccess: () => void;
};

export default function AddWishlistModal({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleCreate = async () => {
    if (!user?.uid || !name) return;
    try {
      setLoading(true);
      await api.post("/wishlists", {
        name,
        imageURL,
        createdBy: user.uid,
        users: [user.uid],
      });
      setOpen(false);
      onSuccess();
      setName("");
      setImageURL("");
    } catch (err: any) {
      console.error("Error creating wishlist:", err);
      alert("Something went wrong while creating the wishlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded"
        onClick={() => setOpen(true)}
      >
        + Create Wishlist
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded shadow w-full max-w-md border">
            <h2 className="text-lg font-bold mb-4">New Wishlist</h2>
            <input
              type="text"
              placeholder="Wishlist Name"
              className="w-full border px-3 py-2 rounded mb-4 bg-inherit"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              className="w-full border px-3 py-2 rounded mb-4 bg-inherit"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
                onClick={handleCreate}
                disabled={!name || loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
