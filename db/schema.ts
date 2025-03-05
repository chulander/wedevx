import { randomUUID } from "crypto";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

// Helper functions
const id = () =>
  text("id")
    .primaryKey()
    .$default(() => randomUUID());

const createdAt = () =>
  text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull();

const editedAt = () =>
  text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull();

const intId = () => integer("id").primaryKey();
/* -------------------------------------------------------------------------- */
/*                                Tables                                      */
/* -------------------------------------------------------------------------- */

// Users Table
export const users = sqliteTable("users", {
  id: id(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  linkedin: text("linkedin"),
  password: text("password").notNull(),
  citizenship: text("citizenship"),
  created_at: createdAt(),
  updated_at: editedAt(),
});

// Visa Categories Table
export const visa_category = sqliteTable("visa_category", {
  id: intId(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  created_at: createdAt(),
  updated_at: editedAt(),
});

// Visa Application Table
export const visa_applications = sqliteTable("visa_applications", {
  id: id(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  request: text("request").notNull(),
  created_at: createdAt(),
  updated_at: editedAt(),
});

// Visa Application Categories (Join Table)
export const visa_applications_categories = sqliteTable(
  "visa_applications_categories",
  {
    id: id(),
    visa_application_id: text("visa_application_id")
      .notNull()
      .references(() => visa_applications.id),
    visa_category_id: integer("visa_category_id")
      .notNull()
      .references(() => visa_category.id),
    created_at: createdAt(),
    updated_at: editedAt(),
  },
);

/* -------------------------------------------------------------------------- */
/*                                Relationships                               */
/* -------------------------------------------------------------------------- */

// Users -> Visa Applications (One-to-Many)
export const usersRelations = relations(users, ({ many }) => ({
  visaApplications: many(visa_applications),
}));

// Visa Application -> User and Categories (Many-to-One and One-to-Many via join)
export const visaApplicationRelations = relations(
  visa_applications,
  ({ one, many }) => ({
    user: one(users, {
      fields: [visa_applications.user_id],
      references: [users.id],
    }),
    // This relation shows the join table entries; to get the actual visa_categories,
    // you'll need to join visa_application_categories with visa_categories.
    applicationCategories: many(visa_applications_categories),
  }),
);

// Visa Categories -> Visa Applications (Many-to-Many via join)
export const visaCategoriesRelations = relations(visa_category, ({ many }) => ({
  visaApplications: many(visa_applications_categories),
}));

// Join Table relations
export const visaApplicationCategoriesRelations = relations(
  visa_applications_categories,
  ({ one }) => ({
    visaApplication: one(visa_applications, {
      fields: [visa_applications_categories.visa_application_id],
      references: [visa_applications.id],
    }),
    visaCategory: one(visa_category, {
      fields: [visa_applications_categories.visa_category_id],
      references: [visa_category.id],
    }),
  }),
);
