import { query, mutation } from "./_generated/server";
import { v } from 'convex/values';
// import { hashPassword, comparePassword } from '../utils/hash.js'
// import bcrypt from 'bcrypt'

// Login for admin
export const loginAdmin = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Find admin by email
    const admin = await ctx.db
      .query("admins")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!admin) {
      throw new Error("Admin not found");
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(
      args.password, 
      admin.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Return admin details (excluding password)
    return {
      id: admin._id,
      email: admin.email,
      username: admin.username,
    };
  },
});

// Get admin by ID
export const getAdminById = query({
  args: { 
    adminId: v.id("admins") 
  },
  handler: async (ctx, args) => {
    const admin = await ctx.db.get(args.adminId);

    if (!admin) {
      return null;
    }

    // Exclude password from returned data
    const { password, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
  },
});

// Update admin details
export const updateAdmin = mutation({
  args: {
    id: v.id("admins"),
    username: v.optional(v.string()),
    email: v.optional(v.string()),
    password: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    // Perform update
    return await ctx.db.patch(id, updateData);
  },
});

// Delete admin
export const deleteAdmin = mutation({
  args: { 
    id: v.id("admins") 
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("admins").collect();
  },
});

export const findByEmail = query({
  args: {
    email: v.string(),
    password: v.string()
  },
  handler: async (ctx, args) => {
    // Find admin by email
    const admin = await ctx.db.query("admins")
      .filter(q => q.eq(q.field("email"), args.email))
      .unique();

    // If no admin found, return null
    if (!admin) {
      return null;
    }

    return(admin)
  }
});

// Create a new admin
export const createAdmin = mutation({
  args: {
    username: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if admin with email already exists
    const existingAdmin = await ctx.db
      .query("admins")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();
    
    if (existingAdmin) {
      throw new Error("Admin with this email already exists");
    }

    const adminId = await ctx.db.insert("admins", {
      username: args.username,
      email: args.email,
      password: args.password,
    });

    return adminId;
  },
});

// Retrieve all admins (without passwords)
export const getAllAdmins = query({
  args: {},
  handler: async (ctx) => {
    const admins = await ctx.db.query("admins").collect();
    return admins.map(({ password, ...admin }) => admin);
  },
});

