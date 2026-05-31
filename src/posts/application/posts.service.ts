import { PostInputModel, PostViewModel } from "../types/postsModel";
import { WithId } from "mongodb";
import { postsRepositories } from "../../composition-root";

export class PostsService {
  async create(newPosts: PostViewModel): Promise<WithId<PostViewModel>> {
    return await postsRepositories.create(newPosts);
  }
  async update(id: string, postsInputBody: PostInputModel): Promise<void> {
    await postsRepositories.update(id, postsInputBody);
    return;
  }
  async delete(id: string): Promise<void> {
    await postsRepositories.delete(id);
    return;
  }
}
