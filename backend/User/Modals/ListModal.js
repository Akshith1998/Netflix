const mongoose=require("mongoose");

const ListSchema=new mongoose.Schema({
    title:{
        type:String
    },
    type:{
        type:String
    },
    genre:{
        type:String
    },
    content:{
        type:Array 
    }
})

const ListModal=mongoose.model("List",ListSchema);
module.exports=ListModal;