import { UserModel } from "@/models/user.model";
import { Service } from "typedi";

@Service()
export class FindAllUsersUseCase {
  async execute() {
    return await UserModel.find({});
  }
}
