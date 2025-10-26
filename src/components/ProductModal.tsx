import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: Props) {
  const { addToCart } = useCart();
  if (!product) return null;

  return (
    <AnimatePresence mode="wait">
      {product && (
        <Dialog as="div" open={!!product} onClose={onClose} className="relative z-50">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* Clickable background */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
            />

            {/* Modal box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden focus:outline-none z-10"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
                  <motion.img
                    key={product.image}
                    src={product.image}
                    alt={product.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-60 h-60 object-contain md:w-72 md:h-72"
                  />
                </div>

                {/* Info */}
                <div className="md:w-1/2 p-6 flex flex-col">
                  <button
                    onClick={onClose}
                    className="self-end text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    &times;
                  </button>

                  <h2 className="text-2xl font-bold mb-3 text-gray-800">{product.title}</h2>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  <p className="text-2xl font-semibold text-gray-900 mb-6">
                    ${product.price.toFixed(2)}
                  </p>

                  <button
                    onClick={() => {
                      addToCart({ ...product, quantity: 1 });
                      onClose();
                    }}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-6 rounded-xl font-medium shadow hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
