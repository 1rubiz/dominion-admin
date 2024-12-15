import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


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
      const imageId =  await ctx.db.insert("carouselImages", {
        storageId: args.storageId,
        originalName: args.originalName,
        mimeType: args.mimeType,
        sizeInBytes: args.sizeInBytes,
        uploadedAt: Date.now()
      });
    //   console.log(imageId)
      const imageUrl = await ctx.storage.getUrl(args.storageId);
      return {
        imageId,
        imageUrl
      };
    }
});

export const getCarousel = query({
    args: {},
    handler: async (ctx) => {
        const galley = await ctx.db.query("carousel").collect();
        return galley;
    }
})

export const saveCarousel = mutation({
    args: {
      imageUrls: v.array(v.object({
        imageUrl: v.string(),
        imageId: v.string()
      })),
    },
    handler: async (ctx, { imageUrls }) => {
      const { db } = ctx;
  
      // Check if collection already exists
      let collection = await db
        .query("carousel")
        .collect()
        // .filter((q) => q.eq(q.field("collectionName"), collectionName))
        // .first();
  
      if (collection && collection.imageUrls) {
        // Append new images to existing collection
        console.log(collection)
        collection.push(...imageUrls);
        await db.patch(collection._id, { imageUrls: collection });
      } else {
        // Create a new collection
        await db.insert('carousel', {
          imageUrls,
        });
      }
  
      return { success: true, message: "Gallery updated successfully." };
    },
  });

  export const deleteImages = mutation({
    args: {
      id: v.string(),
      imageUrls: v.array(v.string()),
      url_id: v.id("carousel")
    },
    handler: async (ctx, { imageUrls, id, url_id }) => {
      const { db } = ctx;
  
      // Find the collection
      const collection = await db
        .query("carousel")
        // .filter((q) => q.eq(q.field("collectionName"), collectionName))
        .first();
  
      if (!collection) {
        throw new Error("Carousel not found");
      }
  
      // Filter out the images to be deleted
      const remainingImages = collection.imageUrls.filter((url) => !imageUrls.includes(url));
  
      // Delete storage files
      const imageRecord = await db
        .query('carouselImages')
        .filter((q) => q.eq(q.field("storageId"), id))
        .unique();

      if (imageRecord) {
        await db.delete(imageRecord._id);
      }else{
        throw new Error("Image not found in the database");
      }
      
      await ctx.db.delete(url_id);
      // if (remainingImages.length === 0) {
      //   // Remove the entire collection if no images are left
      //   // await db.query("gallery").delete(collection._id);
      //   return { success: true, message: "Collection deleted as it had no images left" };
      // } else {
      //   // Update the collection with remaining images
      //   await db.patch(collection._id, { imageUrls: remainingImages });
        return { success: true, message: "Images deleted successfully", remainingImages };
      // }
    },
  });
  