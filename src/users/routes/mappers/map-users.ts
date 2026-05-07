import { WithId } from "mongodb";
import { UserViewModel } from "../../types/UserViewModel";

export function mapUsers(items: WithId<UserViewModel>[]): UserViewModel[] {
  let AllUsers: UserViewModel[] = [];
  for (let i = 0; i < items.length; i++) {
    AllUsers.push({
      id: items[i].id,
      login: items[i].login,
      email: items[i].email,
      createdAt: items[i].createdAt,
    });
  }
  return AllUsers;
}
