const mongoose=require("mongoose");

const MyListSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    trailer:{
        type:String
    },
    year:{
        type:String
    },
    limit:{
        type:Number
    },
    user:{
        type:String
    }
})

const MyListModal=mongoose.model("MyList",MyListSchema);
module.exports=MyListModal;