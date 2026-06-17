import Activity from "../models/activity.js"

export const getAllActivities=async(req,res)=>{
    try{
        const user=req.user
    
        const activities=await Activity.find({user:user._id})
        res.status(200).json(activities)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

export const getUniqueActivity=async(req,res)=>{
    try{
        const user=req.user

        const activity=await Activity.findById(req.params.id);

        if(!activity){
            return res.status(404).json({error:"Activity not found"})
        }
        res.status(200).json(activity)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

export const deleteAllActivities=async(req,res)=>{
    try{
        const user=req.user

        await Activity.deleteMany({user:user._id})
        res.status(200).json({message:"Deleted activities successfully"})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}