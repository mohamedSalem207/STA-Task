import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cart";

type ProductModalProps = {
  data: Product;
  onClose: () => void;
};

export default function ProductModal({ data, onClose }: ProductModalProps) {
  const dispatch: AppDispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  /* Start of the function that handle extras and options */
  const [options, setOptions] = useState<any[]>(
    data.extrasWithOptions.map((option) => {
      return {
        extra_id: option.extra_id,
        required: option.is_required,
        type: option.extra_type_name === "radio" ? "radio" : "checkbox",
        options: [],
      };
    })
  );

  function handleExtras(extra: any, option: any) {
    setOptions((prev) => {
      return prev.map((item) => {
        if (item.extra_id === extra.extra_id) {
          if (extra.extra_type_name === "radio") {
            item.options = [
              {
                extra_id: extra.extra_id,
                id: option.id,
                price: option.price,
              },
            ];
          } else {
            if (item.options.find((el: any) => el.id === option.id)) {
              item.options = item.options.filter(
                (el: any) => el.id !== option.id
              );
            } else {
              item.options.push({
                extra_id: extra.extra_id,
                id: option.id,
                price: option.price,
              });
            }
          }
        }

        return item;
      });
    });
  }
  /* End of the function that handle extras and options */

  /* Start of the function that calc total price */
  const totalPrice = useMemo(() => {
    const allOptions = options.map((option) => option.options);

    const allOptionsPrice = allOptions
      .flat()
      .reduce((sum, item) => sum + (item.price || 0), 0);

    return quantity * data.price + allOptionsPrice;
  }, [quantity, options]);
  /* End of the function that calc total price */

  /* Start of the function that check the disability of the submit btn */
  const isDisabled = useMemo(() => {
    if (options.length)
      return options.some(
        (option) => option.required && !option.options.length
      );

    return false;
  }, [options]);
  /* End of the function that check the disability of the submit btn */

  /* Start of the function that handle adding the product to cart */
  const [submitLoading, setSubmitLoading] = useState(false);

  async function handleAddToCart() {
    if (!isDisabled) {
      setSubmitLoading(true);

      const formData = new FormData();

      formData.append("restaurant_id", data.restaurant.toString());
      formData.append("item_id", data.id.toString());
      formData.append("quantity", quantity.toString());

      const allOptions = options.map((option) => option.options);

      const allExtractedOptions = allOptions.flat();

      allExtractedOptions.map((option, i) => {
        formData.append(`extras[${i}][extra_id]`, option.extra_id);
        formData.append(`extras[${i}][option_id]`, option.id);
      });

      await axios
        .post(
          `${import.meta.env.VITE_API_URL}/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/order/order-item`,
          formData
        )
        .then(() => {
          toast.success("Product added to cart successfully.");
        })
        .catch((e) => {
          toast.error(e.response.data.message);

          console.error(e);
        })
        .finally(() => {
          setSubmitLoading(false);

          onClose();

          dispatch(addToCart({ ...data, quantity }));
        });
    }
  }
  /* End of the function that handle adding the product to cart */

  useEffect(() => {
    /* Closing the modal when the use presses ESC key from keyboard */
    document.onkeydown = (e) => {
      if (e.keyCode === 27) {
        if (!submitLoading) onClose();
      }
    };
    /* End of closing the modal when the use presses ESC key from keyboard */

    /* Toggle body overflow when the component mount and unmount */
    document.body.classList.add("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
    /* End of toggling body overflow when the component mount and unmount */
  });

  return (
    <div
      onClick={() => {
        if (!submitLoading) onClose();
      }}
      className="fixed top-0 start-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center size-full z-50 p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg lg:w-[600px] w-full max-h-[95vh] p-3 lg:p-5"
      >
        <button
          type="button"
          name="close-modal"
          className="absolute disabled:opacity-60 disabled:cursor-not-allowed -top-[13px] -end-[13px] size-[35px] flex items-center justify-center bg-primary text-white rounded-full"
          disabled={submitLoading}
          onClick={onClose}
        >
          <i className="fa-solid fa-close" />
        </button>

        <img
          src={data.image}
          className="object-cover h-[250px] lg:mb-5 mb-3 lg:h-[300px] w-full rounded-lg"
          alt={`${data.display_name}-image`}
          draggable={false}
        />

        <div className="overflow-auto max-h-[55vh] lg:max-h-[45vh] pe-3">
          <h5 className="lg:font-semibold font-medium lg:text-lg mb-2">
            {data.display_name}
          </h5>

          <div
            dangerouslySetInnerHTML={{ __html: data.description }}
            className="lg:text-sm text-xs line-clamp-3 lg:mb-5 mb-3"
          />

          <div className="flex items-center justify-between">
            <span className="text-primary lg:font-semibold font-medium">
              {new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "AED",
              }).format(data.price)}
            </span>

            <div className="flex h-[45px] items-center border-2 border-primary rounded-lg">
              <button
                type="button"
                className="w-[45px] h-full flex items-center justify-center text-primary"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <i className="fa-solid fa-plus" />
              </button>

              <div className="border-e-2 border-s-2 h-full border-primary px-2 w-fit max-w-[100px] min-w-[50px]">
                <input
                  type="number"
                  className="h-full text-center block w-full"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(+e.target.value)}
                />
              </div>

              <button
                type="button"
                className="w-[45px] h-full flex items-center justify-center text-primary disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
                onClick={() => {
                  if (quantity > 1) setQuantity((prev) => prev - 1);
                }}
              >
                <i className="fa-solid fa-minus" />
              </button>
            </div>
          </div>

          <div className="lg:space-y-5 space-y-3 lg:my-7 my-5">
            {data.extrasWithOptions.map((extra, i) => (
              <div key={i}>
                <div className="flex items-center justify-between lg:mb-5 mb-3 bg-gray-100 px-5 py-3">
                  <h5
                    className="font-medium truncate max-w-[80%]"
                    title={extra.name}
                  >
                    {extra.name}
                  </h5>

                  {extra.is_required ? (
                    <span className="text-error">Required</span>
                  ) : (
                    ""
                  )}
                </div>

                {extra.option.map((option: any) => (
                  <div
                    key={option.id}
                    className="flex items-center select-none justify-between px-3 w-full lg:mb-2 mb-1.5 last-of-type:mb-0"
                  >
                    <label
                      htmlFor={`${extra.name}-${option.id}`}
                      className="capitalize cursor-pointer text-sm lg:font-medium"
                    >
                      {option.name}
                    </label>

                    <label
                      htmlFor={`${extra.name}-${option.id}`}
                      className="flex items-center cursor-pointer gap-2"
                    >
                      {extra.extra_type_name === "radio" ? (
                        ""
                      ) : (
                        <span className="text-sm">
                          {new Intl.NumberFormat("en-us", {
                            style: "currency",
                            currency: option.currency,
                          }).format(option.price)}
                        </span>
                      )}

                      <input
                        type={
                          extra.extra_type_name === "radio"
                            ? "radio"
                            : "checkbox"
                        }
                        name={extra.name}
                        className="size-4 cursor-pointer"
                        id={`${extra.name}-${option.id}`}
                        onChange={() => handleExtras(extra, option)}
                      />
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="w-full bg-primary text-white lg:font-semibold font-medium h-[50px] rounded-lg flex items-center justify-between px-5 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={submitLoading || isDisabled || quantity < 1}
            onClick={handleAddToCart}
          >
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-plus" />

              <span>Add to Cart</span>
            </div>

            <span className="text-sm">
              {new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "AED",
              }).format(totalPrice)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
