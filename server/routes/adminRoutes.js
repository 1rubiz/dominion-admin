import  express from 'express';
import { getAdmins, createAdmin, deleteAdmin, editAdmin, logAdmin, validateAdmin } from '../controllers/adminControllers.js'

const router = express.Router();

// Route definitions
router.get('/', getAdmins);
router.post('/create', createAdmin);
router.patch('/update', editAdmin);
router.post('/delete', deleteAdmin);
router.get('/validate', validateAdmin);
router.post('/login', logAdmin)

export default router;