import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

type Props = {
  wishlistId: string;
  onSuccess: () => void;
};

export default function AddProductModal({ wishlistId, onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", imageURL: "", price: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const isFormValid = form.name && form.imageURL && form.price;

  const handleCreate = async () => {
    const price = parseFloat(form.price);
    if (isNaN(price)) {
      alert("Please enter a valid number for price.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/products", {
        name: form.name,
        imageURL: form.imageURL,
        price,
        wishlistId,
        addedBy: user?.uid,
      });
      setOpen(false);
      onSuccess();
      setForm({ name: "", imageURL: "", price: "" });
    } catch (err: any) {
      console.error("Error adding product:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  return (
    <>
      <button
        className="bg-green-600 text-white font-bold px-4 py-2 rounded"
        onClick={() => setOpen(true)}
      >
        + Add Product
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-black p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isFormValid && !loading) handleCreate();
              }}
            >
              <input
                type="text"
                placeholder="Product Name"
                className="w-full bg-inherit border px-3 py-2 rounded mb-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full bg-inherit border px-3 py-2 rounded mb-2"
                value={form.imageURL}
                onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full bg-inherit border px-3 py-2 rounded mb-4"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 border rounded"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                  disabled={!isFormValid || loading}
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
