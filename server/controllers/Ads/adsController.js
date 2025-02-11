const upload = require('../../utils/upload');  
const { createEntity, getEntityById, getAllEntities, updateEntity, deleteEntity } = require('../../utils/crudHelper');
const Ad = require('../../models/Ad');

// Create Ad with uploaded file (media)
const createAd = async (req, res) => {
    // Use multer's 'upload' utility for file handling
    upload.single('mediaUrl')(req, res, async (err) => {  // 'mediaUrl' is the key in your form data
        if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err.message });
        }

        const { title, mediaType, duration, priority, startDate, endDate } = req.body;
        const mediaUrl = req.file ? req.file.path : '';  // Store the file path in the DB

        // Ensure all required fields are present
        if (!title || !mediaType || !mediaUrl || !duration || !startDate || !endDate) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        try {
            const adData = {
                title,
                mediaType,
                mediaUrl,  // This will be the path to the uploaded file
                duration,
                priority,
                startDate,
                endDate
            };

            const newAd = await createEntity(Ad, adData);
            res.status(201).json({ message: 'Ad created successfully', ad: newAd });
        } catch (error) {
            res.status(500).json({ message: 'Error creating ad', error });
        }
    });
};


// Get All Ads
const getAllAds = async (req, res) => {
    try {
        const ads = await getAllEntities(Ad);
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ads', error });
    }
};

// Get Ad by ID
const getAdById = async (req, res) => {
    const { id } = req.params;
    try {
        const ad = await getEntityById(Ad, id);
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }
        res.status(200).json(ad);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ad', error });
    }
};

// Update Ad
const updateAd = async (req, res) => {
    const { id } = req.params;
    const { title, mediaType, mediaUrl, duration, priority, startDate, endDate } = req.body;

    // Ensure required fields are present
    if (!title || !mediaType || !mediaUrl || !duration || !startDate || !endDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const updatedAd = await updateEntity(Ad, id, { title, mediaType, mediaUrl, duration, priority, startDate, endDate });
        if (!updatedAd) {
            return res.status(404).json({ message: 'Ad not found' });
        }
        res.status(200).json({ message: 'Ad updated successfully', ad: updatedAd });
    } catch (error) {
        res.status(500).json({ message: 'Error updating ad', error });
    }
};

// Delete Ad
const deleteAd = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAd = await deleteEntity(Ad, id);
        if (!deletedAd) {
            return res.status(404).json({ message: 'Ad not found' });
        }
        res.status(200).json({ message: 'Ad deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ad', error });
    }
};

module.exports = {
    createAd,
    getAllAds,
    getAdById,
    updateAd,
    deleteAd
};
