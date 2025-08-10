import {
  boolean,
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const coffees = pgTable("coffees", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  origin: varchar("origin", { length: 255 }),
  description: text("description"),
  tags: text("tags").array(),
  roastLevel: varchar("roast_level", { length: 20 }),
  rating: integer("rating"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const machines = pgTable("machines", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  brand: varchar("brand", { length: 255 }),
  description: text("description"),
});

export const tests = pgTable("tests", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  date: date("date").notNull(),
  cafe: varchar("cafe", { length: 100 }).notNull(),
  machine: varchar("machine", { length: 100 }).notNull(),
  beverageType: varchar("beverage_type", { length: 50 }).notNull(),
  quantity: integer("quantity").notNull(),
  temperature: integer("temperature").notNull(),
  pressure: integer("pressure").notNull(),
  grindSize: varchar("grind_size", { length: 50 }),
  intensity: integer("intensity").notNull(),
  bitterness: integer("bitterness").notNull(),
  acidity: integer("acidity").notNull(),
  rating: integer("rating").notNull(),
  comment: varchar("comment", { length: 255 }),
  favorite: boolean("favorite").default(false),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
