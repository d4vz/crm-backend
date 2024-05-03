import { config } from "dotenv";
import { z } from "zod";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  SECRET_KEY: z.string(),
  LOG_FORMAT: z.string(),
  LOG_DIR: z.string(),
  ORIGIN: z.string(),
  MONGO_URI: z.string(),
  CREDENTIALS: z.coerce.boolean().default(false),
  MONGOOSE_DEBUG: z.coerce.boolean().default(false),
  RABBITMQ_URI: z.string(),
});

export const env = envSchema.parse(process.env);
