const express=require("express");
const router=express.Router();
const UserDataModal=require("../Modals/UserModal");
const dotenv=require("dotenv");
dotenv.config();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {ExistingUser,generatepasswordhash}=require("../Utility");

router.post("/register",async(req,res)=>{
    if(await ExistingUser(req.body.email)){
        res.status(400).send("Email already exists.")
    }else{
        generatepasswordhash(req.body.password).then((passwordHash)=>{
            UserDataModal.insertMany({username:req.body.username, email:req.body.email, password:passwordHash,Admin:req.body.Admin})
            .then((data)=>{
                res.status(200).send(data)
            }).catch((err)=>{
                res.status(400).send(err.message)
            });
        })
    }
});

router.post("/login",(req,res)=>{
    UserDataModal.find({email:req.body.email}).then((userdata)=>{
        if(userdata.length){
            bcrypt.compare(req.body.password, userdata[0].password).then((val)=>{
                if(val){
                    const authToken=jwt.sign({email:userdata[0].email,name:userdata[0].name}, process.env.SECRET_KEY);
                    res.status(200).send({
                        "token":authToken
                    });
                }else{
                    res.status(400).send("Invalid Password");
                }
            })
        }else{
            res.status(400).send("Unauthorized user");
        }
    })
});

router.put("/:id",(req,res)=>{
    UserDataModal.findById(req.params.id).then((data)=>{
        if(data && data.email===req.body.userdata.email){
            UserDataModal.findByIdAndUpdate(req.params.id,{$set:req.body}).then(()=>{
                res.status(200).send("user updated successfully")
            })
        }else{
            res.status(400).send("user not found");
        }
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
})

router.delete("/:id",(req,res)=>{
    UserDataModal.findById(req.params.id).then((data)=>{
        if(data && data.email===req.body.userdata.email){
            UserDataModal.findByIdAndDelete(req.params.id).then(()=>{
                res.status(200).send("user deleted successfully")
            })
        }else{
            res.status(400).send("user not found");
        }
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
})

router.get("/:id",(req,res)=>{
    UserDataModal.findById(req.params.id).then((data)=>{
        if(data){
            res.status(200).send(data)
        }else{
            res.status(400).send("user data not found")
        }
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
})

module.exports=router;