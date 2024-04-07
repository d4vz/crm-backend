import { Roles } from "@/interfaces/roles.enum";
import { User } from "@/interfaces/users.interface";

export const isAdmin = (user: User) => {
  return user?.roles?.includes(Roles.Admin);
};
