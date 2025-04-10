const mongoose=require("mongoose");
const {Schema}=mongoose;


const UserSchema=new Schema({
   
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        email:true,
    },
    password:{
        type:String,

    },
    repositories:[
        {
            default:[],
            type:Schema.Types.ObjectId,
            ref:"Repository",
        },
    ],
    followUsers:[
        {
            default:[],
            type:Schema.Types.ObjectId,
            ref:"User",
        },
    ],
      starRepos:[
        {
            default:[],
            type:Schema.Types.ObjectId,
            ref:"Repository",
        },
    ],
})

const User=mongoose.model("User",UserSchema)
module.exports= User;