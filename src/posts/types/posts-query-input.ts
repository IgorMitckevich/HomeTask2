import { PaginatedOutput } from "../../core/types/Paginated-output";
import { PostSortFields } from "../constants/post-sort-fields";

export type PostsQueryInput = PaginatedOutput &
  Partial<{ searchNameTerm: string }>;
