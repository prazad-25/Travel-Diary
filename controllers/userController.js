const asyncHandler = require("express-async-handler");
const users = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
// @dec Register a User
// @routes Post /api/user/register
// @access public

const registerUser = asyncHandler( async (req,res) => {
    const {userName,email,password,role}=req.body;
    if(!userName || !email || !password || !role){
        res.status(400);
        throw new Error("All fields are Mandatory");
    }
    const userAvailable = await users.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }
    const userNameAvailable = await users.findOne({userName});
    if(userNameAvailable){
        res.status(400);
        throw new Error("User name not available");
    }
    
    //hash password
    const hashPassword = await bcrypt.hash(password,10);

    // create user
    const user = await users.create({
        userName,
        email,
        password:hashPassword,
        role,
    })
    if(user){
        res.status(201).json({_id:user.id, email:user.email});
    }
    else{
        res.status(400);
        throw new Error("User data not valid");
    }
    res.status(200).json({message:"Register user"});
});

// @dec Login User
// @routes Post /api/user/login
// @access public

const loginUser = asyncHandler( async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are Mandatory");
    }
    const user = await users.findOne({email});
    //comparing the passoword of the user in database
    if(user && await bcrypt.compare(password,user.password)){
        const accessToken = jwt.sign({
            user:{
                userName:user.userName,
                email:user.email,
                id:user.id,
                role:user.role,
            }

        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"20m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Invalid user name or password");
    }
    
});

// @dec Current User
// @routes Get /api/user/current
// @access private

const currentUser = asyncHandler( async (req,res) => {
    res.status(200).json(req.user);
});

module.exports = {registerUser , loginUser , currentUser};