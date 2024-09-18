import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import validator from "validator";

// Creating JWT
const createToken = (id)=>{
    const secretkey = process.env.jwtToken;
    if(!secretkey){
        throw new Error("No JWT token found")
    }
    return jwt.sign({id},secretkey,{expiresIn:'1hr'});
}
//Login user
const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({sucess:false , message: "User doesn't exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token = createToken (user._id);
        const roles = user.role;
        res.json ({success:true, message:"User Logged in Successfully",token,roles});
    }catch(error){
        console.log(error);
        res.json({success:false, message: "Error"});
    }
};

// Register user
const registerUser = async (req,res) =>{
    const {name,email,password} = req.body;
    try{
        //checking if user already registered
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false , message: "User already exists"})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false,message:"Please enter a valid email"});
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password"});
        }
        
        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save();
        const token = createToken (user._id);
        res.json({success:true, token, message: "User saved successfully"}) ;
    }catch(error){
        console.log(error);
        res.json({success:false, message: "Error"});
    }
};
export {loginUser, registerUser};