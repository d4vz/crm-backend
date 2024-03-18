import { MongoDocument } from "./mongo-document.interface";

export interface User extends MongoDocument {
  name: string;
  email: string;
  password: string;
}
