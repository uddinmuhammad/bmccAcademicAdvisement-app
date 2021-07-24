const express = require('express');
const Courses = require('../models/CourseModel');
const StudentCourses = require('../models/StudentCoursesModel');


var CoursesTakenRouter = express.Router();

async function getTakenCourses(courses){
    let takenCourses;
        takenCourses = courses.filter(course => course.grade < 13);
        return takenCourses;

}


CoursesTakenRouter.get('/coursesTaken', async (req, res) => {

    const student = await StudentCourses.findOne({"student": '6088e09d34934fa514246b56'})

    if(!student) res.json('there is no student')
    else{
        const majorCourses = await getTakenCourses(student.courses);
        const englishCourses =  await getTakenCourses(student.englishCourses);
        const creativeExpressionCourses = await getTakenCourses(student.creativeExpressionCourses);
        const individualAndSocietyCourses = await getTakenCourses(student.individualAndSocietyCourses);
        const usExperienceCourses = await getTakenCourses(student.usExperienceInItsDiversityCourses);
        const worldCulturesCourses = await getTakenCourses(student.worldCulturesAndGlobalIssuesCourses);
        const programElectiveCourses = await getTakenCourses(student.programElectiveCourses);


        const newUntakenCourses = majorCourses.concat(englishCourses)
            .concat(creativeExpressionCourses)
               .concat(individualAndSocietyCourses)
                   .concat(usExperienceCourses)
                       .concat(worldCulturesCourses)
                            .concat(programElectiveCourses);


        const coursesDetails = [];
  
        for(course of newUntakenCourses){
            coursesDetails.push(await Courses.findById(course.course));
        }
        //console.log("TakenCourses:",coursesDetails)
        res.json(coursesDetails);
    }
});

module.exports = CoursesTakenRouter;