const express=require("express");
const router=express.Router();
const {Users,Validate}=require("../model/user");


router.get("/", async (req,res)=>{
    const users=await Users.find();
    res.send(users);
});

router.post("/",async(req,res)=>{
    const {error}=Validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    let user=await Users.findOne({email:req.body.email});
    if(user){
        res.status(400).send("User is already Exists");
        return;
    }
    user=new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        gender:req.body.gender,
        dob:req.body.dob,
        bloodGroup:req.body.bloodGroup,
        Address:req.body.Address,
        trainingDomainId:req.body.trainingDomainId,
        educationId:req.body.educationId
    });
    await user.save();
    res.send(user);
})

module.exports=router;