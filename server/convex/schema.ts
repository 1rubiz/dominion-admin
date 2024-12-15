import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  about: defineTable({
    about: v.string(),
    vision: v.string(),
    welcome: v.string(),
  }),
  admins: defineTable({
    email: v.string(),
    password: v.string(),
    username: v.optional(v.string())
  }),
  carousel: defineTable({
    imageUrls: v.array(
      v.object({
        imageId: v.id("_storage"),
        imageUrl: v.string(),
      })
    ),
  }),
  carouselImages: defineTable({
    mimeType: v.string(),
    originalName: v.string(),
    sizeInBytes: v.float64(),
    storageId: v.id("_storage"),
    uploadedAt: v.float64(),
  }),
  gallery: defineTable({
    collectionName: v.string(),
    imageUrls: v.array(
      v.object({
        imageId: v.id("_storage"),
        imageUrl: v.string(),
      })
    ),
  }).index("by_collection_name", ["collectionName"]),
  images: defineTable({
    mimeType: v.string(),
    originalName: v.string(),
    sizeInBytes: v.float64(),
    storageId: v.id("_storage"),
    uploadedAt: v.float64(),
  }),
});