import { z } from "zod";

export const PostItemSchema = z.object({
  imgUrl: z.string(),
  username: z.string(),
  total_comment: z.number(),
});

const PostResponseSchema = z.object({
  statusCode: z.number(),
  data: z.array(PostItemSchema),
});

const PostRequestSchema = z.object({});

const PostAPISchema = {
  PostsHome: {
    Request: PostRequestSchema,
    Response: PostResponseSchema,
  },
};

export default PostAPISchema;
