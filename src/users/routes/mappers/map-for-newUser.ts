import { WithId } from "mongodb";
import { UserViewModel } from "../../types/UserViewModel";

export function mapForCreatedUsers(user: WithId<UserViewModel>): UserViewModel {
  return {
    id: user.id,
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
}
