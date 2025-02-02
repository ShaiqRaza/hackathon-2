import express from 'express'
const router = express.Router();
import { getAllJobs, createJob, apply } from '../controllers/jobController.js';
import upload from '../config/multerConfig.js';

router.get('/get-all', getAllJobs);
router.post('/create', createJob);
router.post('/apply/:id', upload.single('resume'), apply);

export default router;