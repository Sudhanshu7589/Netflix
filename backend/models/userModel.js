// const mongoose=require('mongoose')
// const userSchema=new mongoose.Schema({
//     fullName:{
//         type:String,
//         required:true,
//     },
//     email:{
//         typre:String,
//         required:true,
//     },
//     password:{
//         type:String,
//         required:true,
//     }
// },{timestamps:true});

// module.exports=mongoose.model("User",userSchema);

const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
});
module.exports=mongoose.model("User",userSchema);
