import { PostInputModel, PostViewModel } from "../types/postsModel";
import { WithId } from "mongodb";
import { postsRepostirories } from "../../common/composition-root";

export class PostsService {
  async create(newPosts: PostViewModel): Promise<WithId<PostViewModel>> {
    return await postsRepostirories.create(newPosts);
  }
  async update(id: string, postsInputBody: PostInputModel): Promise<void> {
    await postsRepostirories.update(id, postsInputBody);
    return;
  }
  async delete(id: string): Promise<void> {
    await postsRepostirories.delete(id);
    return;
  }
}
