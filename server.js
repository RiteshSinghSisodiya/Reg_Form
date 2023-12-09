const path=require("path");
const cors=require("cors");
const express=require("express");
const mongoose=require("mongoose");
const user=require("./router/user");
const training=require("./router/training");
const education=require("./router/education");
require("dotenv").config();
const port=process.env.port || 2306;
mongoose
    .connect(process.env.Mongo_Url)
    .then(()=>console.log("connection Established.."))
    .catch((err)=>{
        console.log("Something Wrong")
    });

const app=express();

app.use(express.static(path.join(__dirname,"public")));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(
    cors({
        origin:["http://localhost:7004","http://localhost:4000"],
        credentials:true,
    })
);

app.get("/",(req,res)=>{
    res.json({message:"welcome to Ritesh Reg_form"})
});

app.use("/api/user",user)
app.use("/api/training",training)
app.use("/api/education",education)

app.listen(port,()=>{
    console.log(`server link : http://localhost:${port}`);
})