import defineAbilityFor from "@/application/permissions/user.permissions";
import { User } from "@/domain/entities/user.entity";

import { HttpException } from "@/infra/exceptions/HttpException";
import { UserModel } from "@/infra/models/user.model";
import { accessibleBy } from "@casl/mongoose";
import { Service } from "typedi";

@Service()
export class FindAllUsersUseCase {
  async execute(logged: User) {
    const userAbility = defineAbilityFor(logged);

    if (userAbility.cannot("read", "User")) {
      throw new HttpException(403, "You don't have permission to read users");
    }

    const query = accessibleBy(userAbility, "read");
    return await UserModel.find(query);
  }
}
