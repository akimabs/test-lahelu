import { z } from "zod";
import PostAPISchema from "../schema/post.schema";

export namespace PostAPIType {
  export namespace PostsHome {
    export type Request = z.infer<(typeof PostAPISchema)["PostsHome"]["Request"]>;
    export type Response = z.infer<(typeof PostAPISchema)["PostsHome"]["Response"]>;
  }
}
