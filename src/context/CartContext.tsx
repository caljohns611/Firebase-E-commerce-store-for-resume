import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, updateDoc, onSnapshot, writeBatch } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";


// --- Types ---
export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  total: number;
  addToCart: (item: CartItem) => Promise<void>;
  clearCart: () => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, change: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};

// --- Provider ---
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState<CartItem[]>([]);
    const { showToast } = useToast();

  // Real time cart listener
    useEffect(() => {
        if (!user) {
            setCart([]);
            return;
        }

        const ref = collection(db, "users", user.uid, "cart");
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            const items: CartItem[] = [];
            snapshot.forEach((docSnap) => {
                items.push(docSnap.data() as CartItem);
            });
            setCart(items);
        });

        // Clean up listener when user logs out or component unmounts
        return () => unsubscribe();
    }, [user]);



    // Add or update item
    const addToCart = async (item: CartItem) => {
        if (!user) {
        alert("Please sign in first.");
        return;
        }

        const ref = doc(db, "users", user.uid, "cart", item.id.toString());
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
            const existing = snapshot.data() as CartItem;
            await updateDoc(ref, { quantity: existing.quantity + 1 });
        } else {
            await setDoc(ref, item);
        }
    };


  // Remove single item
  const removeFromCart = async (id: number) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "cart", id.toString()));
    showToast("Removed from cart", "info");
  };


  // Update quantity (increment or decrement)
  const updateQuantity = async (id: number, change: number) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "cart", id.toString());
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return;

    const item = snapshot.data() as CartItem;
    const newQty = item.quantity + change;
    if (newQty <= 0) {
      await deleteDoc(ref);
    } else {
      await updateDoc(ref, { quantity: newQty });
    }
  };


  // Clear the whole cart
  const clearCart = async () => {
    if (!user) return;

    try {
        const cartRef = collection(db, "users", user.uid, "cart");
        const snapshot = await getDocs(cartRef);

        if (snapshot.empty) {
            setCart([]);
            return;
        }

        // Use a Firestore batch to delete everything at once
        const batch = writeBatch(db);
        snapshot.docs.forEach((docSnap) => {
            batch.delete(doc(db, "users", user.uid, "cart", docSnap.id));
        });
        await batch.commit();

        // Force local state clear 
        setCart([]);
    } catch (error) {
        console.error("Error clearing cart:", error);
    }
    showToast("Cart cleared", "info")
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, total, addToCart, clearCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
