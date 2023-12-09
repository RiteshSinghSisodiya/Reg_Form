const mongoose=require("mongoose");
const Joi=require("joi");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:30
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    phone:{
        type:String,
        required:true,
        minlength:10,
    },
    gender:{
        type:String,
        required:true,
        minlength:4,
        maxlength:6
    },
    dob:{
        type:String,
        required:true,
    },
    bloodGroup:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    trainingDomainId:{
        type:String,
        required:true,
    },
    educationId:{
        type:String,
        required:true,
    }
});

const Users=mongoose.model("User",UserSchema);
function ValidateUser(info){
    const Schema=Joi.object({
        name:Joi.string().required().min(5),
        email:Joi.string().required().email().min(7),
        password:Joi.string().required().min(8),
        phone:Joi.string().required().min(10),
        gender:Joi.string().required().min(4).max(6),
        dob:Joi.string().required(),
        bloodGroup:Joi.string().required(),
        Address:Joi.string().required(),
        trainingDomainId:Joi.string().required(),
        educationId:Joi.string().required()
    });
    return Schema.validate(info);
}

exports.Users=Users;
exports.Validate=ValidateUser;

