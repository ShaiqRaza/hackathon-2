import mongoose from 'mongoose'

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    applications:[
        {
            name: String,
            email: String,
            resume: Buffer,
        }
    ],
})

export const jobModel = mongoose.model('job', jobSchema)