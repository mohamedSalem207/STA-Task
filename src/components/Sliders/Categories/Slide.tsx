import { Link, useParams } from "react-router-dom";
import Skeleton from "../../Globals/Skeleton";

type CategorySlideProps = {
  data: Category;
  loading?: boolean;
};

export default function CategorySlide({
  data: { display_name, id },
  loading,
}: CategorySlideProps) {
  const params = useParams();

  return (
    <>
      {loading ? (
        <Skeleton classNames="h-[55px] rounded-md" />
      ) : (
        <Link
          to={`/categories/${id}`}
          className={`border-2 font-medium lg:text-lg border-primary py-3 text-center rounded-lg block px-5 hover:bg-primary hover:text-white duration-300 ${params.id == id ? "text-white bg-primary" : "text-primary bg-transparent"}`}
        >
          {display_name}
        </Link>
      )}
    </>
  );
}
