import { Link, useLocation } from "react-router-dom";
import { useCartTotals } from "../hooks/calcCartQty";

export default function Navbar() {
  const { qty } = useCartTotals();

  const { pathname } = useLocation();

  return (
    <nav className="bg-gray-300 sticky top-0 z-50 py-7 shadow-white">
      <div className="container">
        <div className="flex items-center justify-between">
          {pathname !== "/" && (
            <Link
              to="/"
              className="border-2 hidden md:inline-flex gap-3.5 items-center justify-center duration-300 bg-transparent border-primary rounded-md py-2 px-5 text-primary hover:bg-primary hover:text-white"
            >
              <i className="fa-solid fa-angle-left relative top-[1px]" />

              <span>Back</span>
            </Link>
          )}

          <div
            className={`flex-grow flex items-center justify-start gap-3.5 md:justify-center lg:font-semibold font-medium text-primary lg:text-xl text-lg ${pathname === "/" ? "text-start" : "text-center"}`}
          >
            {pathname !== "/" && (
              <Link to="/" className="text-primary md:hidden inline">
                <i className="fa-solid fa-angle-left relative top-[1px]" />{" "}
              </Link>
            )}

            <h3>In Room Dining</h3>
          </div>

          <div className="relative cursor-pointer">
            <i className="fa-solid fa-cart-shopping text-2xl text-primary" />

            <div className="absolute -top-[7px] -end-[7px] text-xs size-[20px] lg:text-sm lg:font-semibold p-1 aspect-square flex items-center justify-center bg-primary text-white rounded-full">
              {qty > 10 ? "+10" : qty}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
