const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the uploads directory exists inside the server folder
    const uploadDir = path.join(__dirname, '../uploads');  // Going up one level from the current folder (e.g., inside server)

    // Create the uploads folder if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    cb(null, uploadDir);  // Specify the upload folder
  },
  filename: (req, file, cb) => {
    // Set the file name (e.g., using timestamp)
    const fileExtension = path.extname(file.originalname);
    const fileName = Date.now() + fileExtension;
    cb(null, fileName);  // Specify the file name
  }
});

// Configure multer upload
const upload = multer({ storage: storage });

module.exports = upload;
