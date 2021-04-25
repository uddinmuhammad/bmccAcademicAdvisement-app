const express = require('express');
const Courses = require('../models/CourseModel');
const StudentCourses = require('../models/StudentCoursesModel');


var CoursesTakenRouter = express.Router();

async function getMajorTakenCourses(courses){
    let takenCourses;

        takenCourses = courses.filter(course => course.grade < 13);
        return takenCourses;

}





CoursesTakenRouter.get('/coursesTaken', async (req, res) => {

    const student = await StudentCourses.findOne({"student": '607e853523cd756ff31227d5'})

    if(!student) res.json('there is no student')
    else{
        const majorCourses = await getMajorTakenCourses(student.courses);
        const englishCourses =  await getMajorTakenCourses(student.englishCourses);

        const creativeExpressionCourses = await getMajorTakenCourses(student.creativeExpressionCourses);
        const individualAndSocietyCourses = await getMajorTakenCourses(student.individualAndSocietyCourses);
        const usExperienceCourses = await getMajorTakenCourses(student.usExperienceInItsDiversityCourses);
        const worldCulturesCourses = await getMajorTakenCourses(student.worldCulturesAndGlobalIssuesCourses);

        let newUntakenCourses;


        newUntakenCourses = majorCourses.concat(englishCourses
            .concat(creativeExpressionCourses
                .concat(individualAndSocietyCourses
                    .concat(usExperienceCourses
                        .concat(worldCulturesCourses)))));


        const coursesDetails = [];
  
        for(course of newUntakenCourses){
            coursesDetails.push(await Courses.findById(course.course));
        }

        res.json(coursesDetails);
    }
});

module.exports = CoursesTakenRouter;