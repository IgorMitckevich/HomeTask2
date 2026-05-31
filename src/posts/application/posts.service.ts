import { PostInputModel, PostViewModel } from "../types/postsModel";
import { WithId } from "mongodb";
import {inject, injectable} from "inversify";
import {PostsRepostirories} from "../repositories/posts.repostirories";

@injectable()
export class PostsService {
  constructor(@inject(PostsRepostirories) protected postsRepositories: PostsRepostirories) {

  }
  async create(newPosts: PostViewModel): Promise<WithId<PostViewModel>> {
    return await this.postsRepositories.create(newPosts);
  }
  async update(id: string, postsInputBody: PostInputModel): Promise<void> {
    await this.postsRepositories.update(id, postsInputBody);
    return;
  }
  async delete(id: string): Promise<void> {
    await this.postsRepositories.delete(id);
    return;
  }
}
