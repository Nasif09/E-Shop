const Product = require('../models/productModel');

const handleCreateProduct = async(req, res, next) => {
    try{
        let products = await Product.find({});
        let id;
        if(products.length>0){
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        }else{
            id=1;
        }
    
        const product = new Product({
            id: id,
            name: req.body.name,
            //image: req.file.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        console.log(product);
        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        })
    }catch(error){
        console.log(error);
    }
}

const handleGetProduct = async(req, res, next) => {
    try{
        let products = await Product.find({});
        console.log("all products fetched");
        res.send(products);
    }catch(error){
        next(error);
    }
}


module.exports = {
    handleCreateProduct,
    handleGetProduct
 };