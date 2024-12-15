import express from 'express'
import { getCarousel, deleteCarousel, upload } from '../controllers/carouselControllers.js'
import  multer from 'multer';

const uploads = multer({ 
    dest: 'uploads/', // Temporary storage directory
    limits: { 
      fileSize: 10 * 1024 * 1024 // 10MB max file size
    }
});

const router = express.Router();

// Route definitions
router.get('/', getCarousel);
router.post('/upload',  uploads.array('images', 10), upload);
router.patch('/delete', deleteCarousel);

export default router;