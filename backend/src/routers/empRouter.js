const express = require('express');

const { handleCreateEmployee,handleGetEmployee } = require('../controllers/empController');
const upload = require('../middlewares/imageUpload'); 

const employeeRouter = express.Router();

employeeRouter.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.json({
        success: true,
        image_url: `http://localhost:4000/images/${req.file.filename}`
    });
});

employeeRouter.post(
    '/', 
    handleCreateEmployee
);

employeeRouter.get(
    '/', 
    handleGetEmployee
);

module.exports = employeeRouter; 