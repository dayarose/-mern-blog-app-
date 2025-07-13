const mongoose=require('mongoose')
//schema
var schema=mongoose.Schema({
    Name:String,
    Age:Number,
    Dept:String,
    Salary:Number
})
var EmployeeModel=mongoose.model("employe",schema)

module.exports=EmployeeModel