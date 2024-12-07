import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import CartContent from "../components/CartContent";

export default function Default() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  function checkOnlineStatus() {
    window.addEventListener("online", () => {
      setIsOnline(true);
    });

    window.addEventListener("online", () => {
      setIsOnline(true);
    });
  }

  useEffect(() => {
    checkOnlineStatus();

    return () => {
      checkOnlineStatus();
    };
  }, []);

  return (
    <div>
      {isOnline ? (
        <>
          <Navbar />

          <div className="my-7">
            <div className="pb-[110px]">
              <Outlet />
            </div>

            <CartContent />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-error lg:font-medium">
            Check your internet connection.
          </p>
        </div>
      )}
    </div>
  );
}
