const express=require("express");
const router=express.Router();
const MyListModal=require("../Modals/MyListModal");

router.post("/",(req,res)=>{
    MyListModal.find({title:req.body.title}).then((movie)=>{
        if(movie.length===0){
            MyListModal.create({title:req.body.title,description:req.body.description,image:req.body.image,trailer:req.body.trailer,year:req.body.year,limit:req.body.limit,user:req.body.userdata.email}).then((data)=>{
                res.status(200).send(data);
            }).catch((err)=>{
                res.status(400).send(err);
            })
        }else{
            res.status(400).send("movie is already present");
        }
    })
})

router.get("/",(req,res)=>{
    MyListModal.aggregate([{$match:{user:req.body.userdata.email}}]).then((data)=>{
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

module.exports=router;