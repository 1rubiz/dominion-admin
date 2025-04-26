import { api } from "../convex/_generated/api.js";
import client from '../utils/convexHook.js'
import fs from 'fs/promises';
// import  multer from 'multer';

// const upload = multer({ 
//     dest: 'uploads/', // Temporary storage directory
//     limits: { 
//       fileSize: 10 * 1024 * 1024 // 10MB max file size
//     }
//   });

export const upload = async (req, res) => {
  try {
    const { collectionName } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }
    if (!collectionName) {
      return res.status(400).json({ error: "Collection name is required" });
    }

    const imageUrls = [];

    for (const file of files) {
      try {
        const fileContents = await fs.readFile(file.path);

        const uploadUrl = await client.mutation(api.gallery.generateUploadUrl);

        const response = await fetch(uploadUrl, {
          method: 'POST',
          body: fileContents,
          headers: {
            'Content-Type': file.mimetype,
          },
        });

        if (!response.ok) throw new Error('Upload to storage failed');

        const { storageId } = await response.json();

        const storageIdValue = await client.mutation(api.gallery.storeImage, {
          storageId,
          originalName: file.originalname,
          mimeType: file.mimetype,
          sizeInBytes: file.size,
        });

        imageUrls.push({
          imageUrl: storageIdValue.imageUrl,
          imageId: storageId,
        });

        await fs.unlink(file.path);
      } catch (uploadError) {
        console.error('Error uploading individual file:', uploadError);
        // You could collect these errors and include in the final response
      }
    }

    // Save once after all uploads
    const saveResponse = await client.mutation(api.gallery.saveCollection, {
      collectionName,
      imageUrls,
    });

    res.json({ success: true, data: saveResponse });
  } catch (err) {
    console.error("Error handling upload:", err);
    res.status(500).json({ error: "Failed to upload images" });
  }
};

export const deleteGallery = async (req, res) => {
    try {
      const { collectionName, imageUrls, id } = req.body.data;
  
      if (!collectionName || !imageUrls || imageUrls.length === 0) {
        return res.status(400).json({ error: "Collection name and image URLs are required" });
      }
  
      // Delete images from collection in Convex
      await client.mutation(api.gallery.deleteImages, {
        collectionName,
        id
      });
      const deleteUrl = await client.mutation(api.gallery.deleteGalleryUrls, {
        imageUrls,
        collectionName,
      });
  
      res.json({ success: true, data: deleteUrl });
    } catch (err) {
      console.error("Error handling delete:", err);
      res.status(500).json({ error: "Failed to delete images" });
    }
}

export const getGallery = async (req, res)=>{
    try{
      const gallery = await client.query(api.gallery.getGallery)
      res.json(gallery)
    }catch(err){
      console.log(err)
      res.status(500).json({message: 'Server Error', err})
    }
}

export const getGalleryByCollection = async (req, res)=>{
    try{
      const { val } = req.body
      // console.log(req.body)
      const gallery = await client.query(api.gallery.getGalleryItemByCollectionName, {collectionName: val})
      res.json(gallery)
    }catch(err){
      console.log(err)
      res.status(500).json({message: 'Server Error', err})
    }
}

export const getCollections = async (req, res)=> {
    try {
      const collections = await client.query(api.gallery.getGalleryCollections)
      res.json(collections)
    } catch (error) {
      console.error("Error handling upload:", error);
      res.status(500).json({ error: "Failed to upload images" });
    }
}
// export const editCollection  = async (req, res) => {
//     try {
//         const { collectionName } = req.body;
    
//         if (!collectionName) {
//           return res.status(400).json({ error: "Collection name are required" });
//         }
    
//         // Delete images from collection in Convex
//         const deleteResponse = await convex.mutation(api.gallery.)({
//           collectionName,
//         });
    
//         res.json({ success: true, data: deleteResponse });
//       } catch (err) {
//         console.error("Error handling delete:", err);
//         res.status(500).json({ error: "Failed to delete images" });
//     }
// }
