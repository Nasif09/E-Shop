const{ Schema, model } = require('mongoose');

const productSchema = new Schema({
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
}
);

const Product= model('Product',productSchema);
module.exports = Product;