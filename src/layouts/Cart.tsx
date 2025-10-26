import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const CartPage: React.FC = () => {
    const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();

    if (cart.length === 0)
        return (
            <motion.div className="min-h-screen flex flex-col items-center justify-center text-center" >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty.</h2>
                <p className="text-gray-500">Browse products and add something to your cart!</p>
            </motion.div>
        );

        return (

            <motion.div 
                className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg"
                initial={{ opacity: 9, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-bold mb-6 border-b pb-3 text-gray-800">Shopping Cart</h1>

                {/* Header Row */}
                <div className="hidden sm:grid grid-cols-3 font-semibold text-gray-500 pb-2 border-b">
                    <span>Products</span>
                    <span className="text-center">Quantity</span>
                    <span className="text-right">Price</span>
                </div>

                {/* Cart Items */}
                <AnimatePresence mode="popLayout">
                    {cart.map((item) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col sm:grid sm:grid-cols-3 sm:items-center justify-between py-5 gap-4 border-b"
                    >
                        {/* Product Info */}
                        <div className="flex items-center gap-4">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-contain bg-gray-50 p-2 rounded-xl border"
                        />
                        <div>
                            <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                            {item.title}
                            </h3>
                            <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                            <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-500 hover:text-red-600 hover:underline mt-1 transition"
                            >
                            Remove
                            </button>
                        </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center gap-3">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-bold transition"
                        >
                            -
                        </motion.button>
                        <motion.span
                            key={item.quantity}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="text-lg font-medium"
                        >
                            {item.quantity}
                        </motion.span>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-bold transition"
                        >
                            +
                        </motion.button>
                        </div>

                        {/* Item Total */}
                        <p className="text-right text-lg font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </motion.div>
                    ))}
                </AnimatePresence>

                {/* Footer summary */}
                <motion.div 
                    layout
                    className="mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t">
                        <div className="text-xl font-semibold">
                            Total:{" "}
                            <span className="text-green-600">${total.toFixed(2)}</span>
                        </div>

                        <div className="flex gap-3">
                            <button 
                                onClick={() => {
                                    if (confirm("Are you sure you want to clear your cart?"))
                                        clearCart();
                                }}
                                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                            >
                                Clear Cart
                            </button>

                            <button className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
                                Checkout
                            </button>
                        </div>
                    </motion.div>
            </motion.div>
        );
}

export default CartPage;