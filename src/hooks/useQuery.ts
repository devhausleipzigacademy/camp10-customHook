import axios from "axios";
import { useEffect, useState } from "react";

export function useQuery<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefetch, setRefetch] = useState(false);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setIsError(true);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
        setRefetch(false);
      });
  }, [isRefetch]);

  function refetch() {
    setRefetch(true);
  }

  return { data, isLoading, isError, error, refetch };
}
