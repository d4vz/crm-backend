import { MongoDocument } from "./mongo-document.interface";

export interface Company extends MongoDocument {
  name: string;
  address: string;
  phone: string;
  email: string;
}
