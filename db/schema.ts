import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { GATE_YEAR_OPTIONS } from "../lib/early-access";

export * from "./auth-schema";

export const gateYearEnum = pgEnum("gate_year", GATE_YEAR_OPTIONS);

export const waitlistTable = pgTable("waitlist", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 120 }),
  gateYear: gateYearEnum("gate_year"),
  feedback: text("feedback"),
});
