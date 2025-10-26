import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 animate-pulse text-lg">Loading products...</p>
      </div>
    );

  if (error)
    return <p className="text-red-600 text-center font-medium mt-10">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Featured Products
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onSelect={setSelectedProduct} />
        ))}
      </div>

      {/* Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
