// import { Response, Request } from "express";
// import { HttpStatus } from "../../../core/https-statuses/httpStatuses";
// import { BlogViewModel } from "../../types/blogersModel";
// import { WithId } from "mongodb";
// import { blogsService } from "../../../composition-root";
// import { queryBlogsRepositories } from "../../../composition-root";
//
// export async function deleteBlogsById(
//   req: Request,
//   res: Response,
// ): Promise<void> {
//   try {
//     const id: string = req.params.id as string;
//
//     const FoundedBlog: WithId<BlogViewModel> | null =
//       await queryBlogsRepositories.getBlogById(id);
//     if (!FoundedBlog) {
//       res.sendStatus(HttpStatus.NotFound);
//       return;
//     }
//
//     await blogsService.delete(id);
//     res.sendStatus(HttpStatus.NoContent);
//   } catch (error) {
//     res.sendStatus(HttpStatus.InternalServerError);
//   }
// }
