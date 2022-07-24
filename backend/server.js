const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const UserController=require("./User/Routes/User");
const MovieController=require("./User/Routes/Movie");
const ListController=require("./User/Routes/List");
const MyListController=require("./User/Routes/MyList");
const routes=["/user/login","/user/register"];
const jwt=require("jsonwebtoken");
const cors=require("cors")
 
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use((req,res,next)=>{
    if(routes.includes(req.url)){
        next();
    }else{
        const user=jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        req.body.userdata=user;
        next();
    }
});

mongoose.connect(process.env.connection).then(()=>{
    console.log(`Database is connected`);
}).catch((err)=>{
    console.log(err);
})

app.use("/user",UserController);
app.use("/movie",MovieController);
app.use("/list",ListController);
app.use("/mylist",MyListController);

app.listen(process.env.Port || 3001,console.log(`server is running at port ${process.env.Port}`));