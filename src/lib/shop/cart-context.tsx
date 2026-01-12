"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "./types";

const CART_STORAGE_KEY = "sacred-geometry-cart";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { printfulVariantId: number } }
  | { type: "UPDATE_QUANTITY"; payload: { printfulVariantId: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_OPEN"; payload: boolean }
  | { type: "HYDRATE"; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.printfulVariantId === action.payload.printfulVariantId
      );

      if (existingIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingIndex]!;
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
        };
        return { ...state, items: updatedItems, isOpen: true };
      }

      // Add new item
      return { ...state, items: [...state.items, action.payload], isOpen: true };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.printfulVariantId !== action.payload.printfulVariantId
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.printfulVariantId !== action.payload.printfulVariantId
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.printfulVariantId === action.payload.printfulVariantId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART": {
      return { ...state, items: [] };
    }

    case "SET_OPEN": {
      return { ...state, isOpen: action.payload };
    }

    case "HYDRATE": {
      return { ...state, items: action.payload };
    }

    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (printfulVariantId: number) => void;
  updateQuantity: (printfulVariantId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Validate cart item has all required fields
 */
function isValidCartItem(item: unknown): item is CartItem {
  const i = item as Record<string, unknown>;
  return (
    typeof i.productId === "string" &&
    typeof i.printfulVariantId === "number" &&
    typeof i.quantity === "number" &&
    typeof i.name === "string" &&
    typeof i.variantName === "string" &&
    typeof i.price === "number" &&
    typeof i.image === "string"
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate it's an array and filter valid items
        if (Array.isArray(parsed)) {
          const validItems = parsed.filter(isValidCartItem);
          dispatch({ type: "HYDRATE", payload: validItems });
        }
      }
    } catch {
      // Invalid JSON, clear it
      localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist cart to localStorage on change (only after hydration)
  useEffect(() => {
    if (typeof window === "undefined" || !isHydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items, isHydrated]);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((printfulVariantId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { printfulVariantId } });
  }, []);

  const updateQuantity = useCallback((printfulVariantId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { printfulVariantId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: "SET_OPEN", payload: true });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: "SET_OPEN", payload: false });
  }, []);

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      state.items,
      state.isOpen,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
