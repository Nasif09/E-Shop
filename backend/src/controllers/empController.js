const Employee = require('../models/empModel');

const handleCreateEmployee = async(req, res, next) => {
    try{
        
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
    }catch(error){
        console.log(error);
    }
}

const handleGetEmployee = async(req, res, next) => {
    try{
        let employee = await Employee.find({});
        res.send(employee);
    }catch(error){
        next(error);
    }
}


module.exports = {
    handleCreateEmployee,
    handleGetEmployee
 };