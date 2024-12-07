import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useMemo } from "react";

type CartItem = {
  quantity: number;
  price: number;
};

type CartState = {
  items: CartItem[];
};

type CartTotals = {
  qty: number;
  totalPrice: number;
};

export const useCartTotals = (): CartTotals => {
  const state = useSelector((state: RootState) => state.cart as CartState);

  const qty = useMemo(
    () => state.items.reduce((acc, item) => acc + (item.quantity || 0), 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () =>
      state.items.reduce(
        (acc, item) => acc + (item.quantity || 0) * (item.price || 0),
        0
      ),
    [state.items]
  );

  return { qty, totalPrice };
};
