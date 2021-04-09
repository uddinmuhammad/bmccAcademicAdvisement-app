// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    }, 
    title: {
        type: String,
        required: true
    },
    credits: {       
        type: Number,
        required: true
    }
})

const allCourse = mongoose.model('Course', courseSchema)

// export default allCourse;
module.exports = allCourse;