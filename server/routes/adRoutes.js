const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken')
const { createAd, getAllAds, getAdById, updateAd, deleteAd } = require('../controllers/Ads/adsController');

// Create a new Ad
router.post('/ads/create',verifyToken, createAd);

// Get all Ads
router.get('/ads', getAllAds);

// Get a single Ad by ID
router.get('/ads/:id', getAdById);

// Update an Ad by ID
router.put('/ads/:id', updateAd);

// Delete an Ad by ID
router.delete('/ads/:id', deleteAd);

module.exports = router;
