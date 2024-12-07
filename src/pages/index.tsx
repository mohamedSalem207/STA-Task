import CategoryCard from "../components/Cards/Category";
import fetchData from "../hooks/useFetchData";
import Search from "../components/Globals/Search";
import { useState } from "react";
import Error from "../components/Globals/Error";
import Empty from "../components/Globals/Empty";

export default function Home() {
  const { data, isLoading, error } = fetchData(
    "8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/categories/2da6c53a-522d-485d-b77c-2fafd601ff0c"
  );

  const [_, setSearch] = useState("");

  return (
    <div className="container">
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <Search
            id="categoriesSearch"
            placeholder="Search for categories..."
            onSearch={(e) => setSearch(e)}
            disabled={isLoading}
          />

          <div className="grid grid-cols-12 gap-3 lg:gap-7">
            {isLoading ? (
              Array.from(Array(10), (_, i) => (
                <div
                  key={i}
                  className="xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12"
                >
                  <CategoryCard
                    data={{
                      id: "",
                      display_name: "",
                      image: "",
                      opens_at: "",
                    }}
                    loading
                  />
                </div>
              ))
            ) : data && data.categories && data.categories.length ? (
              data.categories.map((category: Category) => (
                <div
                  key={category.id}
                  className="xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12"
                >
                  <CategoryCard data={category} />
                </div>
              ))
            ) : (
              <Empty msg="There are no categories." />
            )}
          </div>
        </>
      )}
    </div>
  );
}
