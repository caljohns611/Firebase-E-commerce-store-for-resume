import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

type Props = {
  product: Product;
  onSelect: (product: Product) => void;
};

export default function ProductCard({ product, onSelect }: Props) {
  const { addToCart } = useCart();
  const { showToast } = useToast();


  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl p-5 flex flex-col border border-gray-100 hover:border-blue-500/40 transition-all duration-300 cursor-pointer group"
      onClick={() => onSelect(product)}
    >
      {/* Image container with hover overlay */}
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick view overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className='absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          >
            Quick view
        </motion.div>
      </div>

      {/* Product info */}
      <h2 className="text-sm font-semibold text-gray-700 line-clamp-2 mb-2">
        {product.title}
      </h2>
      <p className="text-lg font-bold text-gray-900 mb-4">
        ${product.price.toFixed(2)}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart({ ...product, quantity: 1 });
          showToast(`${product.title} added to cart`, "success");
        }}
        className="mt-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded-xl font-medium shadow hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}
