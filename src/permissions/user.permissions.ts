import { Roles } from "@/interfaces/roles.enum";
import { User } from "@/interfaces/users.interface";
import { isAdmin } from "@/utils/is-admin";
import { defineAbility } from "@casl/ability";

export default function defineAbilityFor(user: User) {
  return defineAbility((can, cannot) => {
    if (isAdmin(user)) {
      can("manage", "all");
      return;
    }

    can("read", "User", { _id: user._id });
    can("update", "User", { _id: user._id });

    if (user?.roles?.includes(Roles.Manager)) {
      can("read", "User", { company: user.company });
      can("create", "User", { company: user.company });
      can("update", "User", { company: user.company });
      can("delete", "User", { company: user.company });
    }
  });
}
