import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Generate an upload URL
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Store image metadata after upload
export const storeImage = mutation({
  args: {
    storageId: v.string(),
    originalName: v.string(),
    mimeType: v.string(),
    sizeInBytes: v.number()
  },
  handler: async (ctx, args) => {
    // Store image metadata in your database
    const imageId =  await ctx.db.insert("images", {
      storageId: args.storageId,
      originalName: args.originalName,
      mimeType: args.mimeType,
      sizeInBytes: args.sizeInBytes,
      uploadedAt: Date.now()
    });
    // console.log(imageId)
    const imageUrl = await ctx.storage.getUrl(args.storageId);
    // const _storage = await ctx.storage.g
    // console.log('gell', imageId)
    return {
      imageId,
      imageUrl
    };
  }
});

export const getGallery = query({
  args: {},
  handler: async (ctx) => {
    // Find admin by email
    // Fetch the single document from the "about" table
    const gallery = await ctx.db.query("gallery").collect();
    return gallery;
  }
});

export const getCarousel = query({
  args: {},
  handler: async (ctx) => {
    const galley = await ctx.db.query("carousel").collect();
    return galley;
  }
})

export const uploadImage = mutation({
  args: {
    fileName: v.string(),
    contentType: v.string(),
    data: v.any(), // Adjust type based on actual usage
  },
  handler: async (ctx, { fileName, contentType, data }) => {
    const { storage } = ctx;

    // Store the image in Convex's storage
    const storageId = await storage.store(data, contentType);
    const url = storage.getUrl(storageId);

    return { url, storageId, fileName };
  },
});

export const getGalleryCollections = query({
  args: {},
  handler: async (ctx) => {
    const collections = await ctx.db.query("gallery").collect();
    const collectionNames = collections.map((item) => item.collectionName); // assuming 'collection_name' is the field
    return collectionNames;
  }
});

export const getGalleryItemByCollectionName = query({
  args: {
    collectionName: v.string(),
  },
  handler: async (ctx, { collectionName }) => {
    const item = await ctx.db.query("gallery").filter(q => q.eq(q.field("collectionName"), collectionName)).first();
    return item;
  }
});


export const saveCollection = mutation({
  args: {
    collectionName: v.string(),
    imageUrls: v.array(v.object({
      imageUrl: v.string(),
      imageId: v.string()
    })),
  },
  handler: async (ctx, { collectionName, imageUrls }) => {
    const { db } = ctx;

    // Check if collection already exists
    let collection = await db
      .query("gallery")
      .filter((q) => q.eq(q.field("collectionName"), collectionName))
      .first();

    if (collection) {
      // Append new images to existing collection
      collection.imageUrls.push(...imageUrls);
      await db.patch(collection._id, { imageUrls: collection.imageUrls });
    } else {
      // Create a new collection
      await db.insert('gallery', {
        collectionName,
        imageUrls,
      });
    }

    return { success: true, message: "Gallery updated successfully." };
  },
});

export const deleteImages = mutation({
  args: {
    collectionName: v.string(),
    id: v.string()
  },
  handler: async (ctx, { collectionName, id }) => {

    const { db } = ctx;

    // Find the collection
    const collection = await db
      .query("gallery")
      .filter((q) => q.eq(q.field("collectionName"), collectionName))
      .first();

    if (!collection) {
      throw new Error("Collection not found");
    }
      // Find and delete the record in the specified table
      const imageRecord = await db
        .query('images')
        .filter((q) => q.eq(q.field("storageId"), id))
        .unique();

      if (imageRecord) {
        await db.delete(imageRecord._id);
      }else{
        throw new Error("Image not found in the database");
      }
  },
});

// Function to delete URLs from a gallery collection
export const deleteGalleryUrls = mutation({
  args: {
    collectionName: v.string(),
    imageUrls: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    // Find the gallery collection
    const galleryCollection = await ctx.db
      .query("gallery")
      .filter((q) => q.eq(q.field("collectionName"), args.collectionName))
      .unique();

    // If collection doesn't exist, throw an error
    if (!galleryCollection) {
      throw new Error(`Gallery collection '${args.collectionName}' not found`);
    }
    
    const remainingUrls = galleryCollection.imageUrls.filter(
      (imageObj) => !args.imageUrls.includes(imageObj.imageUrl)
    );

    // If no URLs remain, delete the entire collection document
    if (remainingUrls.length === 0) {
      await ctx.db.delete(galleryCollection._id);
      return {
        success: true,
        action: "collection_deleted",
        message: `Collection '${args.collectionName}' completely removed`
      };
    }

    // Update the collection with remaining URLs
    await ctx.db.patch(galleryCollection._id, {
      imageUrls: remainingUrls
    });

    return {
      success: true,
      action: "urls_deleted",
      remainingUrlCount: remainingUrls.length,
      message: `Deleted URLs from collection '${args.collectionName}'`
    };
  }
});
