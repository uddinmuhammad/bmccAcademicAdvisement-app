const mongoose = require('mongoose');
// import CoursesRequired from '../../client/src/components/CoursesRequired';
const { listenerCount } = require('../models/CourseModel');
var ObjectId = mongoose.Types.ObjectId;

const Courses = require('../models/CourseModel');
const StudentCourses = require('../models/StudentCoursesModel');

const nextSemesterMajorCourses = [];
const nextSemesterCommonCourses = [];
const requiredCourses = [];

function compareCourses(courseA, courseB){
    if (String(courseA._id) === String(courseB._id)) {
        return true;
    }
    return false;
}

function containsCourse(course, courseList) {
    //let i;
    for (let i = 0; i < courseList.length; i++) {
        if (String(course._id) === String(courseList[i]._id)) {
            return true;
        }
    }
    return false;
}

async function getCoursesDetails(courses){
    const coursesDetails = [];
    for(course of courses){
        coursesDetails.push(await Courses.findById(course.course));
    }

    return coursesDetails;
}

function getPreReqs(course){
    const preReqs = []
    for(let i = 0; i < course.preReq.length; i++){
        preReqs.push(course.preReq[i]) 
    }

    return preReqs;
}

async function getPreReqDetails(preReqs){
    const preReqsDetails = [];
    for(preReq of preReqs)
        preReqsDetails.push(await Courses.findById(preReq))
}


async function getCreativeExpressionCourses(student){
    const creativeExpressionCourses= student.creativeExpressionCourses
    let checkCreativeExpressionCourses = false;
    const noCreativeExpressionCourses = [];
    
    for(course of creativeExpressionCourses) {
        if(course.grade < 12){
            checkCreativeExpressionCourses = true;
        }
    }

    if(checkCreativeExpressionCourses=== false){
        return getCoursesDetails(creativeExpressionCourses);
    }
    else
        return noCreativeExpressionCourses
}

async function getIndividualAndSocietyCourses(student){
    const individualAndSocietyCourses = student.individualAndSocietyCourses;
    let checkIndividualAndSocietyCourses = false;
    const noIndividualAndSocietyCourses = [];
    
    for(course of individualAndSocietyCourses) {
        if(course.grade < 12){
            checkIndividualAndSocietyCourses = true;
        }
    }

    if(checkIndividualAndSocietyCourses === false){
        return getCoursesDetails(individualAndSocietyCourses);
    }
    else
        return noIndividualAndSocietyCourses;

}
async function getUsExperienceCourses(student){
    const usExperienceCourses = student.usExperienceInItsDiversityCourses;
    let checkUsExperienceCourses = false;
    const noUsExperienceCourses = [];
    
    for(course of usExperienceCourses) {
        if(course.grade < 12){
            checkUsExperienceCourses = true;
        }
    }

    if(checkUsExperienceCourses=== false){
        return getCoursesDetails(usExperienceCourses);
    }
    else
        return noUsExperienceCourses
}

async function getWorldCulturesCourses(student){
    const worldCulturesCourses = student.worldCulturesAndGlobalIssuesCourses;
    let checkWorldCulturesCourses = false;
    const noWorldCulturesCourses = [];
    
    for(course of worldCulturesCourses) {
        if(course.grade < 12){
            checkWorldCulturesCourses = true;
        }
    }

    if(checkWorldCulturesCourses === false){
        return getCoursesDetails(worldCulturesCourses);
    }
    else
        return noWorldCulturesCourses;
}

async function getMajorCourses(courses){
    
        const untakenMajorCourses = courses.filter(course => course.grade > 9 && course.grade < 14);


        return getCoursesDetails(untakenMajorCourses);

}


async function getEnglishCourses(student){
    const englishCourses = student.englishCourses;
    let untakenEnglishCourses;
    
        untakenEnglishCourses = englishCourses.filter(course => course.grade > 9  && course.grade < 14);

        return getCoursesDetails(untakenEnglishCourses);
        //return untakenEnglishCourses;

}


exports.CoursesRequired = async (req, res) => {


    // Courses.insertMany(courses)
    // .catch((error) => {
    //     console.log(error);
    // })


    const student = await StudentCourses.findOne({"student": '607e853523cd756ff31227d5'})

    if(!student) res.json('there is no student')
    else{
        const majorCourses = await getMajorCourses(student.courses);
        const englishCourses =  await getEnglishCourses(student);
        

        const creativeExpressionCourses = await getCreativeExpressionCourses(student);
        const individualAndSocietyCourses = await getIndividualAndSocietyCourses(student);
        const usExperienceCourses = await getUsExperienceCourses(student);
        const worldCulturesCourses = await getWorldCulturesCourses(student);

        let newUntakenCourses;


        newUntakenCourses = majorCourses.concat(englishCourses
            .concat(creativeExpressionCourses
                .concat(individualAndSocietyCourses
                    .concat(usExperienceCourses
                        .concat(worldCulturesCourses)))));


        res.json(newUntakenCourses);
    }

   }



