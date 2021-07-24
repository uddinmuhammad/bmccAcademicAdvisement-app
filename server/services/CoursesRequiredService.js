const mongoose = require('mongoose');
// import CoursesRequired from '../../client/src/components/CoursesRequired';
const { listenerCount } = require('../models/CourseModel');
var ObjectId = mongoose.Types.ObjectId;

const Courses = require('../models/CourseModel');
const StudentCourses = require('../models/StudentCoursesModel');
const CourseServices = require('./CourseService');

const nextSemesterMajorCourses = [];
const nextSemesterCommonCourses = [];
const requiredCourses = [];

exports.CoursesRequired = async (req, res) => {


    // Courses.insertMany(courses)
    // .catch((error) => {
    //     console.log(error);
    // })


    const student = await StudentCourses.findOne({"student": '6088e09d34934fa514246b56'})

    if(!student) res.json('there is no student')
    else{
        
        const majorCourses = await CourseServices.getUntakenCourses(student.courses);
        const englishCourses =  await CourseServices.getUntakenCourses(student.englishCourses)
        

        const creativeExpressionCourses = await CourseServices.getFlexCoursesRequired(student.creativeExpressionCourses);
        const individualAndSocietyCourses = await CourseServices.getFlexCoursesRequired(student.individualAndSocietyCourses);
        const usExperienceCourses = await CourseServices.getFlexCoursesRequired(student.usExperienceInItsDiversityCourses);
        const worldCulturesCourses = await CourseServices.getFlexCoursesRequired(student.worldCulturesAndGlobalIssuesCourses);
        const programElectiveCourses = await CourseServices.getUntakenProgramElectiveCourses(student.programElectiveCourses);

        let newUntakenCourses;


        newUntakenCourses = await majorCourses
                .concat(creativeExpressionCourses)
                .concat(individualAndSocietyCourses)
                .concat(usExperienceCourses)
                .concat(worldCulturesCourses)
                .concat(englishCourses)
                .concat(programElectiveCourses)


        res.json(newUntakenCourses);
    }

   }



