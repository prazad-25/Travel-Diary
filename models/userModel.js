const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userName:{
            type:String,
            require:[true,"Please enter the user_name"],
            unique:[true,"User name already taken"],
        },
        email:{
            type:String,
            required:[true,"Please add the user email address"],
            unique:[true,"Email already taken"],
        },
        password:{
            type:String,
            required:[true,"Please enter the password"],
        },
        role:{
            type:String,
            required:[true,"Please enter the role"],
            enum:["admin","user"],
        },
    },
    {
        timestamps:true
    },
)

module.exports = mongoose.model("user",userSchema);