import Task from "../models/task.js"

export const createTasks = async (req, res) => {
    try {
        const user = req.user
        const { title, description, relatedProject, priority, status, startDate, completedAt, dueDate } = req.body

        const newTask = new Task({
            user: user._id,
            title,
            description,
            relatedProject,
            priority,
            status,
            startDate,
            completedAt,
            dueDate
        })

        await newTask.save()

        res.status(201).json(newTask)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const readTasks= async(req,res)=>{
    try{
        const user=req.user
        const tasks=await Task.find({user:user._id})

        res.status(200).json(tasks)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}