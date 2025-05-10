import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import AddProductModal from "../../components/AddProductModal";
import ProductCard from "../../components/ProductCard";
import { useAuth } from "../../context/AuthContext";

type Product = {
  _id: string;
  name: string;
  price: number;
  imageURL: string;
  addedBy: string;
  reactions?: { emoji: string; by: string }[];
  comments?: { text: string; by: string }[];
};

export default function WishlistPage() {
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const { user, loading } = useAuth();
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      if (id) {
        const res = await axios.get<Product[]>(`https://flockshop-ai.onrender.com`);
        setProducts(res.data);
        setError("");
      }
    } catch (err: any) {
      console.error("Failed to fetch products", err);
      setError("Failed to load products.");
    }
  };

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
    if (user && id) fetchProducts();
  }, [id, user, loading]);

  if (loading) return <p className="p-8 text-gray-500">Loading...</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 md:p-10 text-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">🎁 Shared Wishlist</h1>
          <p className="text-sm text-gray-300">
            Wishlist ID: <span className="text-gray-100">{id}</span>
          </p>
        </div>
        <AddProductModal wishlistId={id as string} onSuccess={fetchProducts} />
      </div>
  
      {error && <p className="text-red-400 mb-4">{error}</p>}
  
      {products.length === 0 ? (
        <div className="mt-12 text-center text-gray-400">
          <p className="text-lg mb-4">No products added yet 🛍️</p>
          <AddProductModal wishlistId={id as string} onSuccess={fetchProducts} />
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} refresh={fetchProducts} />
          ))}
        </div>
      )}
    </div>
  );  
}
