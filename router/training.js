const express=require("express");
const router=express.Router();
const {Training,Validate}=require("../model/training");


router.get("/", async (req,res)=>{
    const training=await Training.find();
    res.send(training);
});

router.post("/",async(req,res)=>{
    const {error}=Validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    let training=new Training({
        domain:req.body.domain,
        period:req.body.period,
    });
    await training.save();
    res.send(training);
})

module.exports=router;