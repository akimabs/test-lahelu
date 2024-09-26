import { useState } from "react";
import { getPostsHome } from "@/api/request/post";
import { dummyData } from "@/constants/data";
import { ZodError } from "zod";
type TData = { imgUrl: string; username: string; total_comment: number };

export const useHome = () => {
  const [mergedData, setMergedData] = useState<TData[]>(dummyData);
  const {
    data: dataPostHome,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = getPostsHome.query(
    {},
    {
      onError: (err) => {
        if (err instanceof ZodError) {
          // do a validation error response
          // error boundary must be nice
        }
      },
      onSuccess: (data) => {
        setMergedData((prevData) => [...prevData, ...data.data]);
      },
    }
  );

  return { dataPostHome, mergedData, isError, isLoading, isFetching, refetch };
};
