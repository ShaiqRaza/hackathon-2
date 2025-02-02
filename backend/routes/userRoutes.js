import express from 'express'
const router = express.Router();
import { jobModel } from '../models/job.js';

app.get('/jobs/get-all', async (req, res) => {
    try{
        const jobs = await jobModel.find();
        res.send(jobs);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})


export default router;