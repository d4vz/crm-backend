import { Roles } from "@/interfaces/roles.enum";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
class User {
  @prop({ type: String, required: true })
  public name: string;

  @prop({ type: String, required: true, unique: true })
  public email: string;

  @prop({ type: String, required: true })
  public password: string;

  @prop({ type: String, required: true, ref: "Company" })
  public company: string;

  @prop({ type: String, required: true, enum: Object.values(Roles) })
  public roles: Roles[];
}

export const UserModel = getModelForClass(User);
