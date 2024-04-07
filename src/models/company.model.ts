import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "companies", timestamps: true } })
class Company {
  @prop({ type: String, required: true })
  public name: string;

  @prop({ type: String })
  public address: string;

  @prop({ type: String })
  public phone: string;

  @prop({ type: String })
  public email: string;
}

export const CompanyModel = getModelForClass(Company);
