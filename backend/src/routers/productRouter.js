const express = require('express');

const { handleCreateProduct, handleGetProduct } = require('../controllers/productController');
const upload = require('../middlewares/imageUpload'); 
// const { uploadProductImage } = require('../middlewares/uploadFile');

const productRouter = express.Router();

productRouter.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.json({
        success: true,
        image_url: `http://localhost:4000/images/${req.file.filename}`
    });
});

productRouter.post(
    '/', 
    handleCreateProduct
);

productRouter.get(
    '/', 
    handleGetProduct
);

module.exports = productRouter; 