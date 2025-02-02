import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import './db/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import jobRoutes from './routes/jobRoutes.js';

app.use(cors());  
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/job', jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});