// import express from 'express';
const express = require('express');
const Courses = require('../models/CourseModel');
const StudentCourses = require('../models/StudentCoursesModel');
const courseServices = require('../services/CourseService')

var coursesNextSemesterRouter = express.Router();

function checkEnglishCourses(courses){
    if(courses.length == 1)
        return({...courses[0], important: true})
    else if(courses.length > 1)
        return({...courses[0], crucial: true})
    else 
        return courses
}

function checkFlexCourses(courses) {
    if(courses.length >= 1){
        if(courses[0].creativeExpression){
            return{
                title: "Creative Expretion Course",
                shouldTake: true,
                credits: "3 Credits Needed"
            }
        }
        else if(courses[0].individualAndSociety){
            return{
                title: "Individual And Society Courses",
                shouldTake: true,
                credits: "3 Credits Needed"
            }
        }
        else if(courses[0].usExperienceInItsDiversity){
            return{
                title: "Us Experience In Its Diversity Courses",
                shouldTake: true,
                credits: "3 Credits Needed"
            }
        }
        else if(courses[0].worldCulturesAndGlobalIssues){
            return{
                title: "World Cultures And Global Issues Courses",
                shouldTake: true,
                credits: "3 Credits Needed"
            }
        }
    }
    else if(courses.length == 0)
            return noCoursesNeeded = [];
            
    else return courses;
    
}


coursesNextSemesterRouter.get('/coursesNextSemester', async (req, res) => {
    const student = await StudentCourses.findOne({"student": '607e853523cd756ff31227d5'});


    const nextSemesterMajorCourses = await courseServices.getNextSemesterCourses(await courseServices.getMajorCourses(student.courses));
    const nextSemesterEnglishCourse = await checkEnglishCourses(await courseServices.getEnglishCourses(student.englishCourses));
    
    const CreativeExpretionCourses =  checkFlexCourses(await courseServices.getFlexCourses(student.creativeExpressionCourses));
    const individualAndSocietyCourses =  checkFlexCourses(await courseServices.getFlexCourses(student.individualAndSocietyCourses));
    const usExperienceInItsDiversityCourses =  checkFlexCourses(await courseServices.getFlexCourses(student.usExperienceInItsDiversityCourses));
    const worldCulturesAndGlobalIssuesCourses =  checkFlexCourses(await courseServices.getFlexCourses(student.worldCulturesAndGlobalIssuesCourses));
    

    const nextSemesterCourses = nextSemesterMajorCourses.concat(nextSemesterEnglishCourse)
    .concat(CreativeExpretionCourses)
    .concat(individualAndSocietyCourses)
    .concat(usExperienceInItsDiversityCourses)
    .concat(worldCulturesAndGlobalIssuesCourses);

    res.json(nextSemesterCourses);
});


module.exports = coursesNextSemesterRouter;