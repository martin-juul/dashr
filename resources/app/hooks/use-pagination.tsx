import { useState, useEffect } from 'react';
import axios from 'axios';
import { PaginatedResponse } from '@/lib/paginated-response.ts';

type UsePaginationProps = {
  initialUrl: string;
};

export function usePagination<T>({ initialUrl }: UsePaginationProps) {
  const [data, setData] = useState<PaginatedResponse<T> | null>(null);
  const [url, setUrl] = useState<string>(initialUrl);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNextPage = () => {
    if (data?.links.next) {
      setUrl(data.links.next);
    }
  };

  const fetchPreviousPage = () => {
    if (data?.links.prev) {
      setUrl(data.links.prev);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<PaginatedResponse<T>>(url);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error, fetchNextPage, fetchPreviousPage };
}
