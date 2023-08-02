const mongoose=require("mongoose");

const dataSchema=mongoose.Schema({
        row:Number,
        category: String,
        priority: String,
        activity: String,
        planned: Number,
        startDate: String,
        endDate: String,
        dependOn: Number,
        precurserTask:String,
        status: String,
        taskOwner: String,
        images:[{pic:String,action:Boolean}]
},{
    versionKey:false
})

const dataModal=mongoose.model("data",dataSchema);

module.exports={dataModal};