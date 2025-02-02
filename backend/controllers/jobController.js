import {jobModel} from '../models/job.js';

export const getAllJobs = async (req, res) => {
    try{
        const jobs = await jobModel.find();
        res.json({
            success: true,
            data: jobs
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "An error occures while fetching the jobs",
            error: err.message
        })
    }
}

export const createJob = async (req, res) => {
    try{
        const {title, description, location, salary, category} = req.body;
        if(!title || !description || !location || !salary || !category)
            return res.status(400).json({success: false, message: "All fields are required"});
        const newJob = new jobModel({
            title, description, location, salary, category
        });
        await newJob.save();
        res.status(200).json({success: true, message: "Job created successfully!", data: newJob});
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "An error occures while creating the job",
            error: err.message
        })
    }
}

export const apply = async (req, res) => {
    try{
        const resume = req.file.buffer;
        const {name, email} = req.body;
        if(!name || !email || !resume)
            return res.status(400).json({success: false, message: "All fields are required"});
        const job = await jobModel.findById(req.params.id);
        if(!job)
            return res.status(404).json({success: false, message: "Job not found"});
        job.applications.push({name, email, resume});
        await job.save();
        res.status(200).json({success: true, message: "Applied successfully!"});
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "An error occures while applying the job",
            error: err.message
        })
    }
}