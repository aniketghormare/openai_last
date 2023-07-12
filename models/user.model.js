const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    age:{type:Number},
    education:{type:String},
    about:{type:String}
},{
    versionKey:false
})

const UserModel=mongoose.model("GeniusUser",userSchema);

module.exports={
    UserModel
}