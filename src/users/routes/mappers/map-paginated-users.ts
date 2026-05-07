import { PaginatorUserViewModel } from "../../types/paginator-userViewModel";
import { UserViewModel } from "../../types/UserViewModel";
import { mapUsers } from "./map-users";
import { WithId } from "mongodb";

export function mapPaginatorUserViewModel(
  users: { items: WithId<UserViewModel>[]; totalCount: number },
  pagesNumber: number,
  pageSize: number,
): PaginatorUserViewModel {
  return {
    pagesCount: Math.ceil(users.totalCount / pageSize),
    page: pagesNumber,
    pageSize: pageSize,
    totalCount: users.totalCount,
    items: mapUsers(users.items),
  };
}
