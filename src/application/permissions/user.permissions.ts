import { User } from "@/domain/entities/user.entity";
import { Roles } from "@/domain/interfaces/roles.enum";

import { isAdmin } from "@/utils/is-admin";
import { defineAbility } from "@casl/ability";

export default function defineAbilityFor(user: User) {
  return defineAbility((can, cannot) => {
    if (isAdmin(user)) {
      can("manage", "all");
      return;
    }

    can("read", "User", { _id: user.id });
    can("update", "User", { _id: user.id });

    if (user?.roles?.includes(Roles.Manager)) {
      can("read", "User", { companyId: user.companyId });
      can("create", "User", { companyId: user.companyId });
      can("update", "User", { companyId: user.companyId });
      can("delete", "User", { companyId: user.companyId });
    }
  });
}
