const port = 4000;
const express = require('express');
const mongoose = require("mongoose")
const jwt =require("jsonwebtoken")
const multer = require('multer')
const path = require("path")
const cors = require('cors');

const app = express();
app.use(express.json()); 
app.use(cors());


// mongoose.connect("mongodb+srv://mdnasifurahman:NLlHdLiHxz2AsI0y@cluster0.mttlrp1.mongodb.net/e-shop")
mongoose
    .connect("mongodb://127.0.0.1:27017/E-Shop")
    .then(()=> console.log("Connect to Database"))
    .catch((err)=> console.log(`Error: ${err}`));

//API creation

app.get("/",(req,res)=>{
    res.send("Express running")
})

//Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})


app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Product Schema
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    data:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    },
})


//Add product API
app.post('/addproduct', async(req, res)=>{
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
        image: req.body.image,
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
})


//GEt all Products API
app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({});
    console.log("all products fetched");
    res.send(products);
})

//Delete Product API
app.post('/removeproduct', async(req, res)=>{
    await Product.findOneAndDelete({id: req.body.id});
    console.log("removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on port"+port);
    }else{
        console.log("Error"+error)
    }
})