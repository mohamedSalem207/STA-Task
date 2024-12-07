import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { removeFromCart, updateQuantity } from "../../store/slices/cart";
import { useState } from "react";
import { handleImageError } from "../../utils/handleImageError";
import { Tooltip } from "react-tooltip";

type CartProduct = Product & {
  quantity: number;
};

export default function CartProduct({
  id,
  image,
  quantity,
  display_name,
  price,
}: CartProduct) {
  const [imageError, setImageError] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex items-center lg:gap-5 gap-3 pb-3 last-of-type:pb-0 border-b border-b-gray-300 last-of-type:!border-b-0">
      <img
        src={image}
        className={`w-[30%] lg:w-[200px] rounded-md lg:h-[175px] h-[70px] ${imageError ? "object-contain" : "object-cover"}`}
        draggable={false}
        alt={`${display_name}-image`}
        onError={(e) => handleImageError(e, setImageError)}
      />

      <div className="flex items-start flex-col gap-2 w-full">
        <Tooltip id={`cart-product-${id}-tooltip`} />
        <h5
          className="font-medium truncate max-w-full"
          data-tooltip-id={`cart-product-${id}-tooltip`}
          data-tooltip-content={display_name}
          data-tooltip-place="top"
        >
          {display_name}
        </h5>

        <h6>
          {new Intl.NumberFormat("en-us", {
            style: "currency",
            currency: "AED",
          }).format(price * quantity)}
        </h6>

        <div className="lg:text-base text-sm flex items-center justify-between w-full">
          <div className="flex items-center justify-center gap-3.5">
            <button
              type="button"
              className="flex lg:size-[35px] size-[25px] items-center justify-center rounded-sm bg-primary text-white"
              onClick={() =>
                dispatch(updateQuantity({ id, quantity: quantity + 1 }))
              }
            >
              <i className="fa-solid fa-plus" />
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              className="flex lg:size-[35px] size-[25px] items-center justify-center rounded-sm bg-error text-white"
              onClick={() => {
                if (quantity > 1)
                  dispatch(updateQuantity({ id, quantity: quantity - 1 }));
                else dispatch(removeFromCart(id));
              }}
            >
              <i className="fa-solid fa-minus" />
            </button>
          </div>

          <button type="button" onClick={() => dispatch(removeFromCart(id))}>
            <i className="fa-solid fa-trash-alt text-error" />
          </button>
        </div>
      </div>
    </div>
  );
}
