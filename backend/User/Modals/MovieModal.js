const mongoose=require("mongoose");

const MovieSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    imageTitle:{
        type:String
    },
    imageTrailer:{
        type:String
    },
    trailer:{
        type:String
    },
    video:{
        type:String
    },
    year:{
        type:String
    },
    limit:{
        type:Number
    },
    genre:{
        type:String
    },
    isSeries:{
        type:String
    }
})

const MovieModal=mongoose.model("Movie",MovieSchema);
module.exports=MovieModal;
