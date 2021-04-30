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

async function requiredFlexCourses(student){

    const requiredFlexCourses = [];

    const CreativeExpretionCourses =  await courseServices.getNextSemesterFlexCourses(student.creativeExpressionCourses);
    const individualAndSocietyCourses =  await courseServices.getNextSemesterFlexCourses(student.individualAndSocietyCourses);
    const usExperienceInItsDiversityCourses = await courseServices.getNextSemesterFlexCourses(student.usExperienceInItsDiversityCourses);
    const worldCulturesAndGlobalIssuesCourses = await courseServices.getNextSemesterFlexCourses(student.worldCulturesAndGlobalIssuesCourses);

    if(CreativeExpretionCourses){
        requiredFlexCourses.push(getFlexCourses(1))
    }
    if(individualAndSocietyCourses){
        requiredFlexCourses.push(getFlexCourses(2))
    }
    if(usExperienceInItsDiversityCourses){
        requiredFlexCourses.push(getFlexCourses(3))
    }
    if(worldCulturesAndGlobalIssuesCourses){
        requiredFlexCourses.push(getFlexCourses(4))
    }

    return requiredFlexCourses;

}

function getFlexCourses(coursesType) {
    //const typeOf = await Courses.find({courses[0].courseType[0]})
    //const courses = await Courses.find({major: major})

    /*
        courseType
        1 = reativeExpretionCourses
        2 = individualAndSocietyCourses
        3 = usExperienceInItsDiversityCourses 
        4 = worldCulturesAndGlobalIssuesCourses 
    */
    
    if(coursesType == 1){
            return{
                title: "Creative Expretion Course",
                shouldTake: true,
                credits: "3 Credits Needed"
            }
        }

    else if(coursesType == 2){
            return{
                title: "Individual And Society Courses",
                shouldTake: true,
                credits: "3 Credits Needed"
            }
        }
    else if(coursesType == 3){
            return{
                title: "Us Experience In Its Diversity Courses",
                shouldTake: true,
                credits: "3 Credits Needed"
            }
        }
    else if(coursesType == 4){
            return{
                title: "World Cultures And Global Issues Courses",
                shouldTake: true,
                credits: "3 Credits Needed"
            }
        }
    else 
        return null;
    
}

function getProgramElectives(courses){
    const programElectives = [];
    let i = 0;
    if(courses.length >= 1){
    for(course of courses){
        programElectives.push({...course, programElective: true}) 
        console.log("programElectives #",i, ":",programElectives[i])
        i++
    }}

    return programElectives;
}


coursesNextSemesterRouter.get('/coursesNextSemester', async (req, res) => {
    const student = await StudentCourses.findOne({"student": '6088e09d34934fa514246b56'});

    
    const nextSemesterMajorCourses = await courseServices.getNextSemesterCourses(await courseServices.getUntakenCourses(student.courses));
    const nextSemesterEnglishCourse = await checkEnglishCourses(await courseServices.getUntakenCourses(student.englishCourses));
    
    const programElectiveCourses = await courseServices.getNextSemesterProgramElectiveCourses(student, student.programElectiveCourses);
    //console.log("From next Semester",getProgramElectives(programElectiveCourses));

    const nextSemesterCourses = nextSemesterMajorCourses
        .concat(await requiredFlexCourses(student))
        .concat(nextSemesterEnglishCourse)
        .concat(getProgramElectives(programElectiveCourses));

    res.json(nextSemesterCourses);
});


module.exports = coursesNextSemesterRouter;