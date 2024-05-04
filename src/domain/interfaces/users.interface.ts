import { MongoDocument } from "./mongo-document.interface";
import { Roles } from "./roles.enum";

export interface UserDocument extends MongoDocument {
  name: string;
  email: string;
  password: string;
  company: string;
  roles: Roles[];
}
