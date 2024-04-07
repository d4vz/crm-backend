import { HttpException } from "@/exceptions/HttpException";
import { User } from "@/interfaces/users.interface";
import { UserModel } from "@/models/user.model";
import defineAbilityFor from "@/permissions/user.permissions";
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
