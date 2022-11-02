const Studentmodel =  require('../models/student')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const SECRET_KEY = 'nnncksncknkdnckendskckdsnkcndkxc'

const Home = async(req,res)=>{
    res.render('index')
}

const register = async(req,res)=>{
    res.render('register')
}

const createStudent = async(req,res)=>{
    const {name,age,sClass, email, password,cpassword } =  req.body
    try {
        const existinguser = await Studentmodel.findOne({email:email})
        if(existinguser){
            return res.json({status:400,message:"Student with given details already exist"})
        }

        if(password !== cpassword){
            return res.json({status:400, message:"passwords not match"})
        }

        const hashPassword1 =  await bcrypt.hash(password, 10)
        const hashPassword2 =  await bcrypt.hash(cpassword, 10)

        const newStudent = await Studentmodel.create({
            name:req.body.name,
            age:req.body.age,
            sClass:req.body.sClass,
            email:req.body.email,
            password:hashPassword1,
            cpassword:hashPassword2,
        })

        const token  = jwt.sign({email:newStudent.email},SECRET_KEY)

        return res.json({status:201, message:"Student registerd successfully", data:newStudent, token:token})
    } catch (error) {
        console.log(error);
        res.json({status:500, message:"Something went wrong"})
    }
}


const login = async(req,res)=>{
    res.render('login')
}

const Login1 = async(req,res)=>{
    const {name, password} = req.body
    try {
        const existinguser = await Studentmodel.findOne({name:name})
        if(!existinguser){
            return res.json({status:400, message:"No Student found with such data"})
        }
      
        const matchPasswords = await bcrypt.compare(password, existinguser.password)
        if(!matchPasswords){
            return res.json({status:400, message:"passwords not match"})
        }

        const token = jwt.sign({email:existinguser.email}, SECRET_KEY)

return res.json({status:201, message:"Log in successfull", data:existinguser, token:token})
    } catch (error) {
        console.log(error);
        res.json({status:500, message:"Something went wrong"})
    }
}

const getAll = async(req,res)=>{
    try {
        const result = await Studentmodel.find({})
        return res.json({status:200, message:"All Students are here", data:result})
    } catch (error) {
        console.log(error);
        res.json({status:500, message:"Something went wrong"})
    }
}

const getSingle = async(req,res)=>{
    try {
        const _id = req.params.id 
        const result = await Studentmodel.findById(_id)
        return res.json({status:200, message:"Student is here", data:result})
    } catch (error) {
        console.log(error);
        res.json({status:500, message:"Something went wrong"})
    }
}

const updateSingle = async(req,res)=>{
    try {
        const _id = req.params.id 
        const result = await Studentmodel.findByIdAndUpdate(_id, req.body)
        return res.json({status:200, message:"Student update", data:result})
    } catch (error) {
        console.log(error);
        res.json({status:500, message:"Something went wrong"})
    }
}

const deleteSingle = async(req,res)=>{
    try {
        const _id = req.params.id 
        const result = await Studentmodel.findByIdAndDelete(_id)
        return res.json({status:200, message:"Student deleted", data:result})
    } catch (error) {
        console.log(error);
        res.json({status:500, message:"Something went wrong"})
    }
}






module.exports = {Home,register,createStudent, login, Login1, getAll,getSingle,updateSingle,deleteSingle}