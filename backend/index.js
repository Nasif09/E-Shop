const port = 4000;
const express = require('express');
const mongoose = require("mongoose")
const jwt =require("jsonwebtoken")
const multer = require('multer')
const path = require("path")
const cors = require('cors');
const { type } = require('os');
const { error } = require('console');

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

app.post("/upload", upload.single('fieldname'),(req,res)=>{
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


//user Schema
const Users = mongoose.model('Users',{
    name: {
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now ,
    }
})

//Employee model
const Employee = mongoose.model('Employees',{
    name: {
        type: String,
    },
    image:{
        type: String,
        // required: true,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    gender:{
        type: String,
        required: true,
    },
    cartData:{
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now ,
    }
})


//Add employee API
app.post('/addemployee', async(req, res)=>{
    let employees = await Employee.find({});
    let id;
    if(employees.length>0){
        let last_employee_array = employees.slice(-1);
        let last_employee = last_employee_array[0];
        id = last_employee.id + 1;
    }else{
        id=1;
    }

    const employee = new Employee({
        id: id,
        username: req.body.username,
        email: req.body.email,
        image: req.body.image,
        gender: req.body.gender,
        password: req.body.password,
    });
    console.log(employee);
    await employee.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//GEt all Employee API
app.get('/allemployee', async(req, res)=>{
    let employee = await Employee.find({});
    res.send(employee);
})

//Delete Employee API
app.post('/removeemployee', async(req, res)=>{
    await Employee.findOneAndDelete({id: req.body.id});
    res.json({
        success: true,
        name: req.body.name
    })
})

//Add user API
app.post('/signup', async(req,res)=>{
    let check = await Users.findOne({email: req.body.email});
    if(check){
        return res.status(400).json({success:false, errors: "existion user with same email"})
    }
    let cart = {};
    for (let i =0; i<300; i++){
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id: user.id
        }
    }
    const token = jwt.sign(data,'secrect_ecom');
    res.json({success: true, token})
})


//SignIN API
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            const passCompare = req.body.password === user.password;
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                };
                const token = jwt.sign(data, 'secret_ecom');
                return res.json({ success: true, token });
            } else {
                return res.json({ success: false, error: "Wrong Password" });
            }
        } else {
            return res.json({ success: false, error: "Wrong Email Id" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


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

//GEt NewCollections API
app.get('/new-collection', async(req, res)=>{
    let products = await Product.find({});
    let new_collection = products.slice(1).slice(-8);
    console.log("newcollection fetched");
    res.send(new_collection);
})

//GEt Popular in women API
app.get('/popular-products', async(req, res)=>{
    let products = await Product.find({category:"women"});
    let polular = products.slice(0,4);
    console.log("polular products fetched");
    res.send(polular);
})


//middleware isUser
const isUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Plese authenticate with valid user"})
    }else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }catch(error){
                res.status(401).send({errors:"please authenticate using valid token"})
        }
    }
}
//creating cart API
app.post('/addtocart', isUser, async(req, res)=>{
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData});
    res.send("Added");
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

//Admin Dashboard API's
app.get('/employee-count', async(req, res)=>{
    let empCount = await Employee.find({}).countDocuments();
    console.log("empCount::",empCount);
    res.sendStatus(200);
})
app.get('/product-count', async(req, res)=>{
    let productCount = await Product.find({}).countDocuments();
    console.log("productCount::",productCount);
    res.sendStatus(200);
})
app.get('/user-count', async(req, res)=>{
    let userCount = await Users.find({}).countDocuments();
    console.log("userCount::",userCount);
    res.send({userCount});
})


app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on port"+port);
    }else{
        console.log("Error"+error)
    }
})