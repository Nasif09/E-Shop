const{ Schema, model } = require('mongoose');

const EmployeeSchema = new Schema({
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
}
);

const Employee= model('Employee',EmployeeSchema);
module.exports = Employee;