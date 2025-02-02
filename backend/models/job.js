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
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
})

const jobModel = mongoose.model('job', jobSchema)