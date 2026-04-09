import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/env";
import * as schema from "./schema";

const sql = neon(env.DATABASE_URL);
const db = drizzle({ client: sql, schema });

export default db;
