import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productKey: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  feedback: string;
}

interface CartState {
  items: Record<string, CartItem>;
}

const initialState: CartState = {
  items: {},
};

export const generateProductKey = (
  product: Omit<CartItem, "productKey" | "quantity" | "feedback">
): string => {
  return btoa(
    JSON.stringify({
      title: product.title,
      price: product.price,
    })
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "productKey">>) => {
      const product = action.payload;
      const productKey = generateProductKey(product);
      if (!state.items[productKey]) {
        state.items[productKey] = {
          ...product,
          productKey,
          quantity: product.quantity || 1,
          feedback: product.feedback || "",
        };
      } else {
        state.items[productKey].quantity += product.quantity || 1;
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productKey: string; quantity: number }>
    ) => {
      const { productKey, quantity } = action.payload;
      if (state.items[productKey]) {
        state.items[productKey].quantity = quantity;
        if (quantity <= 0) {
          delete state.items[productKey];
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productKey = action.payload;
      delete state.items[productKey];
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

// Selector to get the total count of items in the cart
export const selectCartItemCount = (state: { cart: CartState }): number => {
  return Object.values(state.cart.items).reduce(
    (total, item) => total + item.quantity,
    0
  );
};

export default cartSlice.reducer;
