// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const db = require('../database.js');

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
    },
    major: {
        type: Array,
        required: false,
        // enum: ['CS', 'CIS']
    },
    preReq:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: false
    }],
    alternativePreReq:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: false
    },
    coReq:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: false
    }],
    courseType:{
        type: Array,
        required: false,
    },
    CSProgramElective: {
        type: Boolean,
        required: false,
    },
    CISProgramElective: {
        type: Boolean,
        required: false,
    },
    CNTProgramElective: {
        type: Boolean,
        required: false,
    },
})

const Course = mongoose.model('Courses',courseSchema);

// module.exports={
     
//     fetchData:function(callback){
//        var courseData = courseTable.find({});
//        courseData.exec(function(err, data){
//            if(err) throw err;
//            return callback(data);
//        })
       
//     }
// }

// const allCourse = mongoose.model('Course', courseSchema)

module.exports = Course;
