import { useState } from "react";
import { useCartTotals } from "../hooks/calcCartQty";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartProduct from "./Cards/CartProduct";

export default function CartContent() {
  const state = useSelector((state: RootState) => state.cart);

  const { qty, totalPrice } = useCartTotals();

  const [opened, setOpened] = useState(false);

  return (
    <div className="fixed bottom-0 z-50 w-full">
      <div className="lg:rounded-ss-[50px] rounded-ss-3xl lg:rounded-se-[50px] rounded-se-3xl bg-primary py-3.5">
        <div className="container">
          <div className="flex items-center lg:px-0 px-3 justify-between">
            <div className="flex items-center gap-3">
              {state.items.length ? (
                <button
                  type="button"
                  onClick={() => setOpened((prev) => !prev)}
                >
                  <i
                    className={`fa-solid lg:text-lg text-white ${
                      opened ? "fa-angle-up" : "fa-angle-down"
                    }`}
                  />
                </button>
              ) : (
                ""
              )}

              <span className="flex items-center justify-center bg-white rounded-sm font-medium size-[30px] text-primary">
                {qty > 20 ? "+20" : qty}
              </span>

              <h5 className="text-white font-medium">Cart</h5>
            </div>

            <span className="text-white">
              {new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "AED",
              }).format(totalPrice)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white lg:px-0 px-3">
        <div className="container">
          {state.items.length ? (
            <div
              className={`py-5 border-b border-gray-500 ${opened ? "block" : "hidden"}`}
            >
              <div className="overflow-y-auto max-h-[70vh] space-y-3">
                {state.items.map((product) => (
                  <CartProduct key={product.id} {...product} />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="pb-2 pt-3">
            <p className="text-center lg:text-base text-sm text-primary">
              Prices are in AED and are inclusive of 10% service charges, 5% VAT
              & 7% Municipality fee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
