const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const { uploadFile, uploadMultiple } = require('../controllers/uploadController');

router.post('/single', protect, upload.single('file'), uploadFile);
router.post('/multiple', protect, upload.array('files', 5), uploadMultiple);

module.exports = router;
