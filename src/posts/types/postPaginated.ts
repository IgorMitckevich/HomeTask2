import { PostViewModel } from "./postsModel";

export type PostsPaginated = {
  pagesCount: number;
  page: number;
  pageSize: number;
  items: PostViewModel[];
  totalCount: number;
};
