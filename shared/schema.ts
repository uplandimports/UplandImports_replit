import { pgTable, text, serial, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // over-under, side-by-side, semi-auto
  gauge: text("gauge").notNull(), // 12, 16, 20, 28
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  specifications: text("specifications").notNull(), // JSON string
  available: boolean("available").default(true).notNull(),
});

export const configurations = pgTable("configurations", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id).notNull(),
  actionType: text("action_type").notNull(),
  gauge: text("gauge").notNull(),
  barrelLength: text("barrel_length").notNull(),
  stockMaterial: text("stock_material").notNull(),
  finish: text("finish").notNull(),
  customBranding: text("custom_branding"),
  specialRequests: text("special_requests"),
  estimatedPrice: decimal("estimated_price", { precision: 10, scale: 2 }).notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone"),
  inquiryType: text("inquiry_type").notNull(),
  message: text("message").notNull(),
  configurationId: integer("configuration_id").references(() => configurations.id),
  selectedModel: text("selected_model"),
  quantity: integer("quantity"),
  designComments: text("design_comments"),
  createdAt: text("created_at").notNull(),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  productId: integer("product_id").notNull(),
  productName: text("product_name").notNull(),
  quantity: integer("quantity").notNull(),
  customizations: text("customizations"), // JSON string
  brandingRequirements: text("branding_requirements"),
  timelineRequirements: text("timeline_requirements"),
  budgetRange: text("budget_range"),
  additionalNotes: text("additional_notes"),
  status: text("status").notNull().default("pending"), // pending, processing, quoted, accepted, declined
  basePrice: decimal("base_price", { precision: 10, scale: 2 }),
  customizationPrice: decimal("customization_price", { precision: 10, scale: 2 }),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }),
  validUntil: timestamp("valid_until"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertConfigurationSchema = createInsertSchema(configurations).omit({
  id: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  basePrice: true,
  customizationPrice: true,
  totalPrice: true,
  validUntil: true,
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Configuration = typeof configurations.$inferSelect;
export type InsertConfiguration = z.infer<typeof insertConfigurationSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
