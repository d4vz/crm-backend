import { MongoDocument } from "@/domain/interfaces/mongo-document.interface";

export interface Column {
  name: string;
  value: string;
  leads: string[];
}

export interface Funnel extends MongoDocument {
  name: string;
  description: string;
  allowedUsers: string[];
  columns: Column[];
}
