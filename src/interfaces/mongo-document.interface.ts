import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";

export interface MongoDocument extends TimeStamps {
  _id: Types.ObjectId;
}
