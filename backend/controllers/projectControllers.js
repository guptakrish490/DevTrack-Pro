import Project from "../models/project.js"

export const createProject = async (req, res) => {
    try {
        const user = req.user
        const { title, description, relatedGoal, repoURL, liveURL, startDate, endDate, status } = req.body

        const newProject = new Project({ user: user._id, title, description, relatedGoal, repoURL, liveURL, startDate, endDate, status })
        await newProject.save()

        res.status(201).json({ message: "new project created successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getProjects=async(req,res)=>{
    try{
        const user=req.user
        const projects=await Project.find({user:user._id})

        res.status(200).json(projects)
    }
    catch(err){
        res.status(500).json({ error: err.message })
    }
}