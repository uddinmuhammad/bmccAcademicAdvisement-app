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
    CIS:{
        type: Boolean,
        required: false,
    },
    CNT:{
        type: Boolean,
        required: false,
    },
    CS:{
        type: Boolean,
        required: false,
    },
    GIS:{
        type: Boolean,
        required: false,
    },
    preReq:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: false
    }],
    coReq:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: false
    }],
    englishComp:{
        type: Boolean,
        required: false,
    },
    creativeExpression: {
        type: Boolean,
        required: false,
    },
    individualAndSociety: {
        type: Boolean,
        required: false,
    },
    usExperienceInItsDiversity: {
        type: Boolean,
        required: false,
    },
    worldCulturesAndGlobalIssues: {
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
