import { getPostsHome } from "@/api/request/post";
import { ZodError } from "zod";

export const useHome = () => {
  const {
    data: dataPostHome,
    isError,
    isLoading,
    isFetching,
  } = getPostsHome.query(
    {},
    {
      onError: (err) => {
        if (err instanceof ZodError) {
          // do a validation error response
          // error boundary must be nice
        }
      },
    }
  );

  return { dataPostHome, isError, isLoading, isFetching };
};
