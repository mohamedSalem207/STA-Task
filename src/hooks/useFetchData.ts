import axios from "axios";
import { useEffect, useState } from "react";

export default function fetchData(url: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/${url}`);

      setData(res.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error, fetchData };
}
