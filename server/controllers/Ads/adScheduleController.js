const AdSchedule = require('../../models/AdSchedule'); 
const Ad = require('../../models/Ad');  
const { createEntity, getEntityById, getAllEntities, updateEntity, deleteEntity } = require('../../utils/crudHelper');  

// Create Ad Schedule
const createAdSchedule = async (req, res) => {
    const { adId, displayStart, displayEnd, intervalSeconds } = req.body;

    if (!adId || !displayStart || !displayEnd || !intervalSeconds) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Validate that the Ad exists
        const ad = await Ad.findById(adId);
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        const newSchedule = await createEntity(AdSchedule, { adId, displayStart, displayEnd, intervalSeconds });
        res.status(201).json({ message: 'Ad schedule created successfully', schedule: newSchedule });
    } catch (error) {
        res.status(500).json({ message: 'Error creating ad schedule', error });
    }
};

// Get All Ad Schedules
const getAllAdSchedules = async (req, res) => {
    try {
        const schedules = await getAllEntities(AdSchedule);
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ad schedules', error });
    }
};

// Get Ad Schedule by ID
const getAdScheduleById = async (req, res) => {
    const { id } = req.params;
    try {
        const schedule = await getEntityById(AdSchedule, id);
        if (!schedule) {
            return res.status(404).json({ message: 'Ad schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ad schedule', error });
    }
};

// Update Ad Schedule
const updateAdSchedule = async (req, res) => {
    const { id } = req.params;
    const { adId, displayStart, displayEnd, intervalSeconds } = req.body;

    try {
        // Validate that the Ad exists
        const ad = await Ad.findById(adId);
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        const updatedSchedule = await updateEntity(AdSchedule, id, { adId, displayStart, displayEnd, intervalSeconds });
        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Ad schedule not found' });
        }

        res.status(200).json({ message: 'Ad schedule updated successfully', schedule: updatedSchedule });
    } catch (error) {
        res.status(500).json({ message: 'Error updating ad schedule', error });
    }
};

// Delete Ad Schedule
const deleteAdSchedule = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSchedule = await deleteEntity(AdSchedule, id);
        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Ad schedule not found' });
        }
        res.status(200).json({ message: 'Ad schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ad schedule', error });
    }
};

module.exports = {
    createAdSchedule,
    getAllAdSchedules,
    getAdScheduleById,
    updateAdSchedule,
    deleteAdSchedule
};