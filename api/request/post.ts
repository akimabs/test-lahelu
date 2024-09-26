import { get, withQuery } from "..";
import PostAPISchema from "../schema/post.schema";
import { PostAPIType } from "../type/post.type";

// for this moment, think this use dotenv(for react native) and improve the native side for better security
const BASE_URL = "https://dummyjson.com/c";

export const getPostsHome = withQuery(
  "/e303-d50e-4f32-b2be",
  (params: PostAPIType.PostsHome.Request) =>
    get<PostAPIType.PostsHome.Response>("/e303-d50e-4f32-b2be", { baseURL: BASE_URL, params }),
  PostAPISchema.PostsHome.Response
);
