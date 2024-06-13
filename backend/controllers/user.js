const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

exports.Login=async(req,res)=>{
    const {email,password}=req.body;
    try{
    if(!email||!password){
        return res.status(401).json({
            message:"Invalid data",
            success:false
        });
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(401).json(
        {
            message:"Invalid Email or password",
            success:false
        });
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({
            message:"Invalid Email or password",
            success:false
        });
    }
    const tokenData={
        id:user._id
    }
    const token=jwt.sign(tokenData,"sudhanshushekhar",{expiresIn:"1d"});//expriesIn not work 
    return res.status(200).cookie("token",token,{httpOnly:true}).json({
        message:`Welcome back ${user.fullName}`,
        user,
        success:true
    });



} catch(error){
    console.log(error);
    return res.status(401).json({
        message:error,
        message:"Not Login",
        success:false
    }) 
}
}

exports.Logout=async(req,res)=>{
    return res.status(200).cookie("token","",{expiresIn:new Date(Date.now()),httpOnly:true}).json({
        message:"User logged out succefully",
        success:true
    });
}


exports.Register=async(req,res)=>{
    try{
        const {fullName,email,password}=req.body;
        if(!fullName || !email || !password){
            return res.status(401).json({
                success:false,
                message:"Invalid data"
            })
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(401).json({
                success:false,
                message:"This email is already used"
            })
        }
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,16);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in hashing password",
            });
        }
        const response= await User.create({
            fullName,
            email,
            password:hashedPassword
    })
        return res.status(201).json({
            success:true,
            data:response,
            message:"Account created succefully"
        })
    } catch(error){
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success:false,
                data:"Internal sever Error",
                message:err.message,
            })
    }
}