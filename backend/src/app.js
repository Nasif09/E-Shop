const express = require('express');
const mongoose = require("mongoose")
const jwt =require("jsonwebtoken")
const multer = require('multer')
const path = require("path")
const cors = require('cors');
const productRouter = require('./routers/productRouter');
const employeeRouter = require('./routers/empRouter');

const app = express();
app.use(express.json()); 
app.use(cors());


app.get("/",(req,res)=>{
    res.send("Express running")
})

app.use('/images', express.static('upload/images')); 

app.use('/api/employees', employeeRouter)
app.use('/api/products', productRouter)

module.exports = app;