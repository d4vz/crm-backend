import { User } from "@/domain/entities/user.entity";
import { Roles } from "@/domain/interfaces/roles.enum";

export const isAdmin = (user: User) => {
  return user?.roles?.includes(Roles.Admin);
};
