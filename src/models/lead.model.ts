import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

export enum LeadState {
  NEW = "new",
  CONTACTED = "contacted",
  QUALIFIED = "qualified",
  LOST = "lost",
}

@modelOptions({ schemaOptions: { collection: "leads", timestamps: true } })
class Lead {
  @prop({ type: String, required: true })
  public name: string;

  @prop({ type: String })
  public email: string;

  @prop({ type: String })
  public phone: string;

  @prop({ type: String })
  public address: string;

  @prop({ type: String, required: true, ref: "funnels" })
  public funnelId: string;

  @prop({ enum: LeadState, default: LeadState.NEW })
  public state: string;
}

export const LeadModel = getModelForClass(Lead);
