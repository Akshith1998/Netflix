const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    profile_pic:{
        type:String,
        default:""
    },
    Admin:{
        type:Boolean,
        default:false
    }
}) 

const Usermodal=mongoose.model("User",UserSchema);
module.exports=Usermodal;