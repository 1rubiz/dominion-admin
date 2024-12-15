import express from 'express'
import { getAccounts, createAccount, deleteAccount } from "../controllers/accountsController.js";

const router = express.Router();

// Route definitions
router.get('/', getAccounts);
router.post('/create', createAccount);
// router.patch('/update', );
router.post('/delete', deleteAccount);

export default router;