import { Link } from "react-router-dom";
import Skeleton from "../Globals/Skeleton";
import { handleImageError } from "../../utils/handleImageError";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

type CategoryCardProps = {
  data: Category;
  loading?: boolean;
};

export default function CategoryCard({ data, loading }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {loading ? (
        <Skeleton classNames="h-[250px] rounded-xl" />
      ) : (
        <Link
          to={`/categories/${data.id}`}
          className="h-[250px] group block rounded-xl overflow-hidden relative"
        >
          {data.opens_at && (
            <div className="absolute top-0 start-0 flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-error text-white py-2 px-3 w-fit text-sm font-medium min-w-1/4">
              <span>Opens at</span>

              <span>{data.opens_at}</span>
            </div>
          )}

          <div className="to-transparent absolute flex size-full items-end justify-end bg-gradient-to-t from-[rgba(0,0,0,0.9)] p-0" />

          <img
            src={data.image}
            className={`h-full block ${imageError ? "object-contain w-full lg:w-3/4 mx-auto" : "object-cover w-full"}`}
            alt={`${data.image}-image`}
            draggable={false}
            onError={(e) => handleImageError(e, setImageError)}
          />

          <Tooltip id={`category-${data.id}-tooltip`} />
          <h6
            data-tooltip-id={`category-${data.id}-tooltip`}
            data-tooltip-content={data.display_name}
            data-tooltip-place="top"
            className="absolute group-hover:bottom-7 truncate max-w-full lg:text-lg capitalize duration-500 text-white bottom-5 start-0 w-full text-center lg:font-bold font-semibold"
          >
            {data.display_name}
          </h6>
        </Link>
      )}
    </>
  );
}
