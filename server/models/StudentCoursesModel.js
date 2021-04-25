const mongoose = require('mongoose');
const db = require('../database.js');
const students = require('./StudentModel');

const studentCoursesSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: false
    },
    courses:[
        {
            course: {type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: true},
            grade:{type: Number, require: true},
            required: false
        }
    ],
    englishCourses:[
        {
            course: {type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: true},
            grade:{type: Number, require: true},
            required: false
        }
    ],
    creativeExpressionCourses:[
        {
            course: {type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: true},
            grade:{type: Number, require: true},
            required: false
        }
    ],
    individualAndSocietyCourses:[
        {
            course: {type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: true},
            grade:{type: Number, require: true},
            required: false
        }
    ],
    usExperienceInItsDiversityCourses:[
        {
            course: {type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: true},
            grade:{type: Number, require: true},
            required: false
        }
    ],
    worldCulturesAndGlobalIssuesCourses:[
        {
            course: {type: mongoose.Schema.Types.ObjectId, ref: 'worldculturesandglobalissuescourses', required: true},
            grade:{type: Number, require: true},
            required: false
        }
    ],
})

const StudentCourses = mongoose.model('StudentCourse', studentCoursesSchema);

module.exports = StudentCourses;