import { get, withQuery } from "..";
import PostAPISchema from "../schema/post.schema";
import { PostAPIType } from "../type/post.type";

// for this moment, think this use dotenv(for react native) and improve the native side for better security
const BASE_URL = "https://dummyjson.com/c";

export const getPostsHome = withQuery(
  "/5730-64d1-4da5-a695",
  (params: PostAPIType.PostsHome.Request) =>
    get<PostAPIType.PostsHome.Response>("/5730-64d1-4da5-a695", { baseURL: BASE_URL, params }),
  PostAPISchema.PostsHome.Response
);
