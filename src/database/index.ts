import { env } from "@/config";
import { connect } from "mongoose";

export const dbConnection = async () => {
  const mongoDbUri = `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}`;

  await connect(mongoDbUri).then(() => {
    console.log("Connected to MongoDB");
  });
};
