import { useState } from "react";
import { handleImageError } from "../../utils/handleImageError";
import Skeleton from "../Globals/Skeleton";
import ProductModal from "./ProductModal";
import Portal from "../Globals/Portal";
import { Tooltip } from "react-tooltip";

export default function Product({
  loading,
  data,
}: {
  loading?: boolean;
  data: Product;
}) {
  const [imageError, setImageError] = useState(false);

  const [productModal, setProductModal] = useState(false);

  return (
    <>
      {/* Start of the product modal */}
      {productModal ? (
        <Portal>
          <ProductModal data={data} onClose={() => setProductModal(false)} />
        </Portal>
      ) : (
        ""
      )}
      {/* End of the product modal */}

      <div className="flex shadow-md sm:flex-row flex-col items-center gap-2 bg-white overflow-hidden rounded-lg">
        {loading ? (
          <>
            <Skeleton classNames="h-[230px] lg:h-[220px] rounded-none w-full sm:w-[40%]" />

            <div className="flex flex-col w-full items-start flex-1 gap-3 py-3 lg:px-5 px-3">
              <Skeleton classNames="h-[21px] lg:w-3/4 w-full" />

              <div className="flex items-start gap-1.5 w-full flex-col">
                <Skeleton classNames="h-[19px] w-full" />

                <Skeleton classNames="h-[19px] w-full" />

                <Skeleton classNames="h-[19px] w-1/2" />
              </div>

              <div className="flex items-center w-full justify-between">
                <Skeleton classNames="h-[21px] w-[110px]" />

                <Skeleton classNames="h-[45px] w-[150px]" />
              </div>
            </div>
          </>
        ) : (
          <>
            <img
              className={`h-[230px] ${imageError ? "object-contain" : "object-cover"} lg:h-[220px] w-full sm:w-[40%]`}
              src={data.image}
              alt={`${data.display_name}-image`}
              draggable={false}
              onError={(e) => handleImageError(e, setImageError)}
            />

            <div className="flex flex-col items-start w-full flex-1 py-3 gap-2 lg:gap-3 lg:px-5 px-3">
              <Tooltip id={`product-${data.id}-tooltip`} />
              <h5
                data-tooltip-id={`product-${data.id}-tooltip`}
                data-tooltip-content={data.display_name}
                data-tooltip-place="top"
                className="lg:text-lg font-medium truncate max-w-full"
              >
                {data.display_name}
              </h5>

              {data.description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: data.description }}
                  className="mb-2 line-clamp-3 lg:text-base text-sm"
                />
              ) : (
                <p className="text-gray-500">Description not found!</p>
              )}

              <div className="flex items-center w-full justify-between">
                <span>
                  {new Intl.NumberFormat("en-us", {
                    style: "currency",
                    currency: "AED",
                  }).format(data.price)}
                </span>

                <button
                  type="button"
                  className="bg-primary text-white h-[45px] rounded-md px-5"
                  onClick={() => setProductModal(true)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
