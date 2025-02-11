const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./configs/db');
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adRoutes');
// Initialize environment variables
dotenv.config();

// Create the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API Routes
app.use('/api/users', userRoutes);
app.use('/api', adRoutes);

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
