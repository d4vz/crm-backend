import { User } from "../entities/user.entity";
import { MapperRepository } from "../interfaces/mapper-repository.interface";

export interface UsersRepository extends MapperRepository<User> {
  create: (user: User) => Promise<User>;
  updateById: (id: string, user: Partial<User>) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
  deleteById: (id: string) => Promise<boolean>;
  findByEmail: (email: string) => Promise<User | null>;
}
