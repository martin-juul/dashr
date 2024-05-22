import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

type UseFetchProps = {
  url?: string;
};

export function useFetch<T>({url}: UseFetchProps = {}) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async (fetchUrl: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get<T>(fetchUrl);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (url) {
      fetch(url);
    }
  }, [url, fetch]);

  return {data, isLoading, error, fetch};
}
