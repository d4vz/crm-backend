import { env } from "@/config";
import { connect } from "mongoose";

export const dbConnection = async () => {
  const mongoDbUri = env.MONGO_URI;

  await connect(mongoDbUri).then(() => {
    console.log("Connected to MongoDB");
  });
};
