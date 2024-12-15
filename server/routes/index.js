// const express = require('express');
import express from 'express'
// const userRoutes = require('./userRoutes');
import adminRoutes from './adminRoutes.js'
import accountRoutes from './accountRoutes.js'
import aboutRoutes from './aboutRoutes.js'
import galleryRoutes from './galleryRoutes.js'
import carouselRoutes from './carouselRoute.js'

const router = express.Router();

// Mount feature routes
router.use('/admins', adminRoutes);
router.use('/accounts', accountRoutes)
router.use('/about', aboutRoutes)
router.use('/gallery', galleryRoutes)
router.use('/carousel', carouselRoutes)

export default router;
