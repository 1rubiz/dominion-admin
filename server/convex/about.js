import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getAbout = query({
  args: {},
  handler: async (ctx) => {
    const { db } = ctx;

    // Fetch the single document from the "about" query
    const aboutDoc = await db.query("about").collect();
    return aboutDoc;
  },
});

export const patchAbout = mutation({
  args: {
    welcome: v.optional(v.string()),
    about: v.optional(v.string()),
    vision: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { db } = ctx;
    const { ...updates} = args;
    if (typeof updates !== "object" || updates === null || Array.isArray(updates)) {
      throw new Error("Updates must be a non-null object.");
    }

    if (Object.keys(updates).length === 0) {
      throw new Error("Updates object cannot be empty.");
    }

    // Fetch the single document
    const aboutDoc = await db.query("about").first();

    if (!aboutDoc) {
      throw new Error("No document found in the 'about' query.");
    }

    // Update the document using a patch
    await ctx.db.patch(aboutDoc._id, updates);
    // await db.query("about").update(aboutDoc._id, updates);

    return { success: true, message: "About document updated successfully." };
  },
});