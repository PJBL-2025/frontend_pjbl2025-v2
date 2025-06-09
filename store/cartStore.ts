import { ProductCart } from "@/interfaces/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

type CartState = {
  cart: ProductCart[];
  selectedCart: ProductCart[];
  cartLength: () => number;
  addToCart: (product: ProductCart) => void;
  updateCart: (id: number, product: ProductCart) => void;
  removeCart: (id: number) => void;
  orderCart: (product: ProductCart) => void;
  clearOrder: () => void;
};

const asyncStorage: PersistStorage<CartState> = {
  getItem: async (key) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key);
  },
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      selectedCart: [],
      cartLength: () => get().cart.length,
      addToCart: (product: ProductCart) =>
        set((state) => ({
          cart: [...state.cart, product],
        })),
      updateCart: (id: number, product: ProductCart) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, ...product } : item
          ),
        })),
      removeCart: (id: number) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      orderCart: (product: ProductCart) =>
        set((state) => {
          const isSelcted = state.selectedCart.some(
            (item) => item.id == product.id
          );
          return {
            selectedCart: isSelcted
              ? state.selectedCart.filter((item) => item.id !== product.id)
              : [...state.selectedCart, product],
          };
        }),
      clearOrder: () => {
        set({ selectedCart: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: asyncStorage,
    }
  )
);
