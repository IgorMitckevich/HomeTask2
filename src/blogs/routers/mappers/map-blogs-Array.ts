import { ObjectId, WithId } from "mongodb";

import { BlogViewModel } from "../../types/blogersModel";
import { PostsPaginated } from "../../../posts/types/postPaginated";
import { mapPostsPaginated } from "../../../posts/routers/mappers/map-posts-list-paginated-output";

export function blogsMapArray(items: WithId<BlogViewModel>[]): BlogViewModel[] {
  let blogs: BlogViewModel[] = [];
  for (let i = 0; i < items.length; i++) {
    blogs.push({
      id: items[i].id,
      name: items[i].name,
      description: items[i].description,
      websiteUrl: items[i].websiteUrl,
      createdAt: items[i].createdAt,
      isMembership: items[i].isMembership,
    });
  }

  return blogs;
}
