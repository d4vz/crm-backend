import { compare, hash } from "bcrypt";
import { Roles } from "../interfaces/roles.enum";

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public roles: Roles[],
    public companyId: string,
    public id?: string,
  ) {}

  public async hashPassword() {
    if (!this.password) throw new Error("Password is required");
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
  }

  public async comparePassword(password: string) {
    if (!this.password) throw new Error("Password is required");
    const isValid = await compare(password, this.password);
    return isValid;
  }
}
