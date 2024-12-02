const express = require('express');
const multer = require('multer');
const handler = require('./handler');

const router = new express.Router();
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 1 * 1024 * 1024 }, // Maks 1MB
});

router.post('/predict', upload.single('image'), handler.predict);
router.get('/predict/histories', handler.getHistories);

module.exports = router;