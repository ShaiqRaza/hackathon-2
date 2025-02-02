import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import './db/index.js';
const app = express();

import { jobModel } from './models/job.js';

app.get('/jobs/get-all', async (req, res) => {
    try{
        const jobs = await jobModel.find();
        res.send(jobs);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});