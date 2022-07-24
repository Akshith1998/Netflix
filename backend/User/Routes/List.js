const express=require("express");
const router=express.Router();
const ListDataModal=require("../Modals/ListModal");
const UserDataModal=require("../Modals/UserModal");
 
router.post("/",(req,res)=>{
    UserDataModal.find({email:req.body.userdata.email}).then((data)=>{
        if(data[0].Admin){
            ListDataModal.create(req.body).then((data)=>{
                res.status(200).send(data);
            })
        }else{
            res.status(400).send("user is not a admin");
        }
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
})

router.delete("/:id",(req,res)=>{
    UserDataModal.findById(req.params.id).then((data)=>{
        if(data[0].Admin){
            if(data[0].email===req.body.userdata.email){
                ListDataModal.findByIdAndDelete(req.params.id).then(()=>{
                    res.status(200).send("List has been deleted");
                })
            }else{
                res.status(400).send("user is not authorized")
            }
        }else{
            res.status(400).send("user is not a admin")
        }
    }).catch((err)=>{
        res.status(400).send(err.message);
    })
})

router.get("/",async(req,res)=>{
    const typeQuery=req.query.type;
    const genreQuery=req.query.genre;
    let list=[];
    try {
        if(typeQuery){
            if(genreQuery){
                list=await ListDataModal.aggregate([{$match:{type:typeQuery,genre:genreQuery}},{$sample:{size:10}}]);
            }else{
                list=await ListDataModal.aggregate([{$match:{type:typeQuery}},{$sample:{size:10}}]);
            }
        }else{
            list=await ListDataModal.aggregate([{$sample:{size:10}}]);
        }
        res.status(200).send(list);
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports=router;