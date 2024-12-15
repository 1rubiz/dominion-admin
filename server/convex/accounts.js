// accounts.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new account
export const createAccount = mutation({
  args: {
    name: v.string(),
    title: v.string(),
    bank: v.string(),
    number: v.string(),
  },
  handler: async (ctx, args) => {
    const accountId = await ctx.db.insert("accounts", {
      name: args.name,
      title: args.title,
      bank: args.bank,
      number: args.number,
    });
    return accountId;
  },
});

// Update an existing account
export const updateAccount = mutation({
  args: {
    id: v.id("accounts"),
    name: v.optional(v.string()),
    title: v.optional(v.string()),
    bank: v.optional(v.string()),
    number: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    
    // Only update fields that are provided
    await ctx.db.patch(id, updateFields);
    
    return id;
  },
});

// Delete an account
export const deleteAccount = mutation({
  args: {
    id: v.id("accounts"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Retrieve all accounts
export const getAllAccounts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("accounts").collect();
  },
});

// Retrieve a specific account by ID
export const getAccountById = query({
  args: {
    id: v.id("accounts"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});