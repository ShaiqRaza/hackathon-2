import express from 'express'
const router = express.Router();
import { getAllJobs, createJob } from '../controllers/jobController.js';

router.get('/get-all', getAllJobs);
router.post('/create', createJob);

export default router;