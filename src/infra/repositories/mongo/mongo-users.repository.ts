import { User } from "@/domain/entities/user.entity";
import { UserDocument } from "@/domain/interfaces/users.interface";
import { UsersRepository } from "@/domain/repositories/users.repository";
import { UserModel } from "@/infra/models/user.model";

export class MongoUsersRepository implements UsersRepository {
  private userModel = UserModel;

  async create(user: User): Promise<User> {
    const savedUser = await this.userModel.create(user);
    return this.toDomain(savedUser);
  }

  async updateById(id: string, userData: Partial<User>) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, userData, {
      new: true,
    });
    if (!updatedUser) return null;
    return this.toDomain(updatedUser.toObject());
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) return null;
    return this.toDomain(user.toObject());
  }

  async deleteById(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return !!deletedUser;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    return this.toDomain(user.toObject());
  }

  toDomain(user: UserDocument): User {
    const newUser = new User(user.name, user.email, user.password, user.roles, user.company, user._id.toHexString());
    return newUser;
  }
}
