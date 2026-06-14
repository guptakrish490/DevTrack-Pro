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

export const updateProjects=async(req,res)=>{
    try{
        const { newTitle, newDescription, newRelatedGoal, newRepoURL, newLiveURL, newStartDate, newEndDate, newStatus } = req.body

        const project = await Project.findByIdAndUpdate(req.params.id,
            {
                title:newTitle,
                description:newDescription,
                relatedGoal:newRelatedGoal,
                repoURL:newRepoURL,
                liveURL:newLiveURL,
                startDate:newStartDate,
                endDate:newEndDate,
                status:newStatus
            },
            {new:true}
        )

        res.status(200).json(project);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}