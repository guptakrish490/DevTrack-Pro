import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
        maxlength:100
    },
    description:{
        type:String,
        required:true,
        maxlength:200
    },
    relatedGoal:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Goal',
        required:false
    },
    repoURL:{
        type:String,
        required:false
    },
    liveURL:{
        type:String,
        required:false
    },
    startDate:{
        type:Date,
        default:Date.now
    },
    endDate:{
        type:Date,
        default:null
    },
    status:{
        type:String,
        enum:["Planned","In Progress","Completed"],
        default:"Planned"
    }

}, { timestamps: true })


const Project = mongoose.model('Project', projectSchema)
export default Project