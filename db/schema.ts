import { randomUUID } from "crypto";
import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";
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
/*                                Static Tables                               */
/* -------------------------------------------------------------------------- */

// Visa Categories Table
export const visa_category = sqliteTable("visa_category", {
  id: intId(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  created_at: createdAt(),
  updated_at: editedAt(),
});

// Visa Application Status Table
export const status = sqliteTable("application_status", {
  id: text("id").primaryKey(),
  description: text("description").notNull(),
  created_at: createdAt(),
  updated_at: editedAt(),
});

export const country = sqliteTable("country", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  created_at: createdAt(),
  updated_at: editedAt(),
});

/* -------------------------------------------------------------------------- */
/*                                User Tables                                 */
/* -------------------------------------------------------------------------- */

// Users Table
export const users = sqliteTable("users", {
  id: id(),
  first_name: text("first_name").notNull(), // required
  last_name: text("last_name").notNull(), // required
  email: text("email").notNull(), // required
  password: text("password"), // only admin will have password
  created_at: createdAt(),
  updated_at: editedAt(),
});

// Visa Application Table with Resume Upload Support
export const visa_applications = sqliteTable("visa_applications", {
  id: id(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  additional_details: text("additional_details").notNull(),
  status_id: text("status_id")
    .notNull()
    .references(() => status.id),
  // Move citizenship here as a foreign key to country.id
  citizenship_id: text("citizenship_id")
    .notNull()
    .references(() => country.id),
  // Resume fields
  resume_blob: blob("resume_blob").notNull(),
  resume_file_type: text("resume_file_type").notNull(),
  resume_file_name: text("resume_file_name").notNull(),
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
    // Note: visa_category uses an integer primary key
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
// Visa Application -> User, Status, Country, and Categories
export const visaApplicationRelations = relations(
  visa_applications,
  ({ one, many }) => ({
    user: one(users, {
      fields: [visa_applications.user_id],
      references: [users.id],
    }),
    status: one(status, {
      fields: [visa_applications.status_id],
      references: [status.id],
    }),
    citizenship: one(country, {
      fields: [visa_applications.citizenship_id],
      references: [country.id],
    }),
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
