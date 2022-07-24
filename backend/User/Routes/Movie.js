const express=require("express");
const router=express.Router();
const MovieDataModal=require("../Modals/MovieModal");
const UserDataModal=require("../Modals/UserModal");

router.post("/",(req,res)=>{
    UserDataModal.find({email:req.body.userdata.email}).then((data)=>{
        if(data[0].Admin){
            MovieDataModal.create(req.body).then((data)=>{
                res.status(200).send(data);
            })
        }else{
            res.status(400).send("user is not a admin");
        }
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
});

router.put("/:id",(req,res)=>{
    UserDataModal.findById(req.params.id).then((data)=>{
        if(data[0].Admin){
            if(data[0].email===req.body.userdata.email){
                MovieDataModal.findByIdAndUpdate(req.params.id,{$set:req.body}).then((data)=>{
                    res.status(200).send(data);
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

router.delete("/:id",(req,res)=>{
    UserDataModal.findById(req.params.id).then((data)=>{
        if(data[0].Admin){
            if(data[0].email===req.body.userdata.email){
                MovieDataModal.findByIdAndDelete(req.params.id).then(()=>{
                    res.status(200).send("Movie has been deleted");
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

router.get("/find/:id",(req,res)=>{
    MovieDataModal.findById(req.params.id).then((data)=>{
        if(data){
            res.status(200).send(data);
        }else{
            res.status(400).send("Movie not found");
        }
    }).catch((err)=>{
        res.status(400).send(err.message); 
    })
})

router.get("/random",async(req,res)=>{
    const type = req.query.type;
  let movie; 
  try {
    if (type === "series") {
      movie = await MovieDataModal.aggregate([
        { $match: { isSeries: "true" } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await MovieDataModal.aggregate([
        { $match: { isSeries: "false" } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports=router;