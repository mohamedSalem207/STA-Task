import { useParams } from "react-router-dom";
import fetchData from "../../hooks/useFetchData";
import Error from "../../components/Globals/Error";
import Search from "../../components/Globals/Search";
import { useState } from "react";
import CategoriesSliders from "../../components/Sliders/Categories";
import Product from "../../components/Cards/Product";
import Empty from "../../components/Globals/Empty";

export default function Category() {
  const params = useParams();

  const { data, isLoading, error } = fetchData(
    `8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/2da6c53a-522d-485d-b77c-2fafd601ff0c?cat=${params.id}`
  );

  const [_, setSearch] = useState("");

  return (
    <>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <div className="bg-white py-5 lg:mb-7 mb-5">
            <div className="container">
              <Search
                id="categoryItemsSearch"
                placeholder="search for Dishes, Drinks..."
                disabled={isLoading}
                onSearch={(e) => setSearch(e)}
              />

              <CategoriesSliders loading={isLoading} data={data?.categories} />
            </div>
          </div>

          <div className="container">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
              {isLoading ? (
                Array.from(Array(10), (_, i) => (
                  <Product
                    key={i}
                    loading
                    data={{
                      description: "",
                      display_name: "",
                      id: i,
                      image: "",
                      in_cart: false,
                      in_cart_count: 0,
                      is_category_off: false,
                      name: "",
                      price: 0,
                      extrasWithOptions: [],
                      restaurant: 0,
                    }}
                  />
                ))
              ) : data?.items?.data?.length ? (
                data?.items?.data?.map((product: Product) => (
                  <Product
                    key={product.id}
                    data={{ ...product, restaurant: data.restaurant?.id }}
                  />
                ))
              ) : (
                <div className="col-span-12">
                  <Empty msg="There are no products found." />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
