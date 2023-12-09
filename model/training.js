const mongoose=require("mongoose");
const Joi=require("joi");

const TrainingSchema=new mongoose.Schema({
    domain:{
        type:String,
        required:true,
    },
    period:{
        type:String,
        required:true,
    }
});

const Training=mongoose.model("Training",TrainingSchema);
function ValidateTraining(info){
    const Schema=Joi.object({
        domain:Joi.string().required(),
        period:Joi.string().required(),
    });
    return Schema.validate(info);
}

exports.Training=Training;
exports.Validate=ValidateTraining;

