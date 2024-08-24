import { relations } from 'drizzle-orm';
import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    real,
    text,
    timestamp,
    uniqueIndex,
    uuid,
    varchar

} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from "next-auth/adapters"

export const UserRole = pgEnum('user_role', ['ADMIN', 'BASIC', 'OWNER'])

export const UserTable = pgTable('users', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull().unique(),
    isapproved: boolean('is_approved').notNull().default(false),
    password: varchar('password').notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    role: UserRole('user_role').notNull().default('BASIC'),
    createdat: timestamp('created_at').defaultNow().notNull(),
    image: text('image'),
    updatedat: timestamp('updated_at').defaultNow().notNull()
},
    table => {
        return {
            emailIndex: uniqueIndex('email_index').on(table.email, table.id)
        }
    }
)
export type UserTableType = typeof UserTable.$inferSelect


// for drizzle addapter 

export const accounts = pgTable(
    "account",
    {
        userId: uuid("userId")
            .notNull()
            .references(() => UserTable.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)
export type accountsType = typeof accounts.$inferSelect

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: uuid("userId")
        .notNull()
        .references(() => UserTable.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

// end drizzle-addapter
export const ProductTable = pgTable('products', {
    id: uuid('id').defaultRandom().notNull().unique().primaryKey(),
    productname: varchar('product_name').notNull(),
    isDeleted: boolean('is_deleted').notNull().default(false),
    image: varchar('image').notNull().default('no image'),
    createdat: timestamp('created_at').defaultNow().notNull(),
    updatedat: timestamp('updated_at').defaultNow().notNull()
}, table => {
    return {
        productIndex: uniqueIndex('product_index').on(table.id)
    }
})
export type ProductTableType = typeof ProductTable.$inferSelect

export const PriceTable = pgTable("prices", {
    id: uuid('id').notNull().defaultRandom().unique().primaryKey(),
    productid: uuid('product_id').notNull().references(() => ProductTable.id, { onDelete: 'cascade' }),
    purchasedprice: real('purchased_price').notNull().default(0),
    mrp: real('mrp').notNull().default(0),
    discount: real('discount').notNull().default(0),
    createdat: timestamp('created_at').defaultNow().notNull(),
    updatedat: timestamp('updated_at').defaultNow().notNull(),
})

export type PriceTableType = typeof PriceTable.$inferSelect

export const StocksTable = pgTable('stocks', {
    id: uuid('id').notNull().defaultRandom().unique().primaryKey(),
    productid: uuid('product_id').notNull().references(() => ProductTable.id, { onDelete: 'cascade' }),
    totalstock: real('purchased_price').notNull().default(0),
    history: varchar('history').notNull(),
    createdat: timestamp('created_at').defaultNow().notNull(),
    updatedat: timestamp('updated_at').defaultNow().notNull()
})
export type StocksTableType = typeof StocksTable.$inferSelect
// relations
export const UserAccountRelations = relations(UserTable, ({ one, many }) => {
    return {
        account: one(accounts),
    }
})

export const AccountUserRelations = relations(accounts, ({ one }) => {
    return {
        user: one(UserTable, {
            fields: [accounts.userId],
            references: [UserTable.id]
        })
    }
})
export const ProductPriceStockRelation = relations(ProductTable, ({ one }) => {
    return {
        price: one(PriceTable),
        stock: one(StocksTable)
    }
})
export const PriceProductRelation = relations(PriceTable, ({ one }) => {
    return {
        product: one(ProductTable, {
            fields: [PriceTable.productid],
            references: [ProductTable.id]
        })
    }
})
export const StockProductRelation = relations(StocksTable, ({ one }) => {
    return {
        product: one(ProductTable, {
            fields: [StocksTable.productid],
            references: [ProductTable.id]
        })
    }
})