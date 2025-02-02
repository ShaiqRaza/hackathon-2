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