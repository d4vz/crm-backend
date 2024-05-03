import { Roles } from "@/domain/interfaces/roles.enum";
import { User } from "@/domain/interfaces/users.interface";

export const isAdmin = (user: User) => {
  return user?.roles?.includes(Roles.Admin);
};
