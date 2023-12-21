const multer = require('multer');
const mime = require('mime-types');

// Multer disk storage configuration for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// File filter for accepting only PDF files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf'];
  if (allowedMimeTypes.includes(mime.lookup(file.originalname))) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

module.exports = {
  storage,
  fileFilter
};
