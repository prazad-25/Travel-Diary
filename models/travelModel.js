const mongoose = require("mongoose");

const travelSchema = mongoose.Schema(
    {
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User',
        },
        location:{
            type:String,
            required:[true,"Please Enter the Location"]
        },
        date:{
            type:Date,
            required:[true,"Please Enter the Date"]
        },
        notes:{
            type:String,
        },
        driveFolderUrl:{
            type:String,
        },

    },
    {
        timestamps:true,
    }
)
module.exports = mongoose.model("travelDiary",travelSchema);