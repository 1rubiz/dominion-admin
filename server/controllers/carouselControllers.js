import { api } from "../convex/_generated/api.js";
import client from '../utils/convexHook.js'
import fs from 'fs/promises';

export const upload = async (req, res)=>{
    try {
        // const { collectionName } = req.body;
        const files = req.files;
         // Check if files were uploaded
         if (!files || files.length === 0) {
          return res.status(400).json({ error: 'No images uploaded' });
        }
    
        // Upload images to Convex
        const imageUrls = [];
           // Process each uploaded file
           for (const file of req.files) {
            try {
              // Read file contents
              const fileContents = await fs.readFile(file.path)
      
              // Upload to Convex using generateUploadUrl and storeImage
              const uploadUrl = await client.mutation(api.gallery.generateUploadUrl);
              
              // Upload the file to the generated URL
              const response = await fetch(uploadUrl, {
                method: 'POST',
                body: fileContents,
                headers: {
                  'Content-Type': file.mimetype
                }
              });
      
              if (!response.ok) {
                throw new Error('Upload to storage failed');
              }
              const { storageId } = await response.json();
              // Store image metadata in Client
              const storageIdValue = await client.mutation(api.carousel.storeImage, {
                storageId: storageId,
                originalName: file.originalname,
                mimeType: file.mimetype,
                sizeInBytes: file.size,
              });
      
              // Add the generated URL to our results
              imageUrls.push({
                imageUrl: storageIdValue.imageUrl,
                imageId: storageId
              });
      
              // Remove temporary file
              await fs.unlink(file.path)
                const saveResponse = await client.mutation(api.carousel.saveCarousel, {
                  imageUrls,
                });
                res.json({ success: true, data: saveResponse }); 
            } catch (uploadError) {
              console.error('Error uploading individual file:', uploadError);
              // Optional: continue processing other files or stop
            }
          }
      } catch (err) {
        console.error("Error handling upload:", err);
        res.status(500).json({ error: "Failed to upload images" });
      }
}

export const getCarousel = async (req, res)=>{
    // console.log('triggered carousel')
    try{
      const data = await client.query(api.gallery.getCarousel)
      // if(data){
        res.status(200).json({ message: 'Fetched successful', data });
      // }
    }catch(err){
      console.log(err)
      res.status(500).json({message: 'Server Error', err})
    }
}

export const deleteCarousel = async (req, res)=>{
    try {
        const { imageUrls, id , url_id} = req.body.data;
        console.log(imageUrls)

        if (!imageUrls || imageUrls.length === 0) {
            return res.status(400).json({ error: "Image URLs are required" });
        }

        // Delete images from collection in Convex
        const deleteResponse = await client.mutation(api.carousel.deleteImages, { id, imageUrls, url_id });

        res.json({ success: true, data: deleteResponse });
    } catch (err) {
        console.error("Error handling delete:", err);
        res.status(500).json({ error: "Failed to delete images" });
    }
}