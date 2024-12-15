import express from 'express'
import { getAbout, editAbout } from '../controllers/aboutControllers.js'

const router = express.Router();

// Route definitions
router.get('/', getAbout);
// router.post('/create', createAdmin);
router.patch('/update', editAbout);
// router.post('/delete', deleteAdmin);

export default router;