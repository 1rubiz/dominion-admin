import express from 'express'
import { getGallery, upload, deleteGallery, getCollections, getGalleryByCollection } from '../controllers/galleryControllers.js';
import  multer from 'multer';

const uploads= multer({ 
    dest: 'uploads/', // Temporary storage directory
    limits: { 
      fileSize: 10 * 1024 * 1024 // 10MB max file size
    }
});

const router = express.Router();

// Route definitions
router.get('/', getGallery);
router.post('/upload', uploads.array('images', 10), upload);
router.patch('/delete', deleteGallery);
router.get('/collections', getCollections);
router.post('/filter', getGalleryByCollection);

export default router;