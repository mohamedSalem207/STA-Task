import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartProduct = Product & { quantity: number };

type State = {
  items: CartProduct[];
};

const initialState: State = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const isExits = state.items.find((item) => item.id === action.payload.id);

      if (isExits) isExits.quantity += action.payload.quantity;
      else state.items.push(action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) item.quantity = action.payload.quantity;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
