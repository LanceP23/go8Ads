const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = '..//uploads';
    // Create the uploads folder if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);  // specify upload folder
  },
  filename: (req, file, cb) => {
    // Use the original filename for simplicity or create a unique name
    const fileExtension = path.extname(file.originalname);
    const fileName = Date.now() + fileExtension;
    cb(null, fileName);
  }
});

// Configure multer upload
const upload = multer({ storage: storage });

module.exports = upload;
