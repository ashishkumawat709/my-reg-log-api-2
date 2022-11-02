const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        // uppercase:true
    },
    age:{
        type:Number,
        required:true,
        validate(value){
            if(value<18) throw new Error ('Should be greater than 18')
        }
    },
    sClass:{
        type:String,
        required:true,
        enum:['bca','mca', 'btech', 'bsc']
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength: [8, 'must be 8 characters']
    },
    cpassword:{
        type:String,
        required:true
    },
})

const Studentmodel = new mongoose.model('Studentmodel', StudentSchema)

module.exports =  Studentmodel