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


function findIfCommonCourse(preReqs, coursePreReqs){

       for(let i = 0; i < preReqs.length; i++) {
          
        for(let j = 0; j < coursePreReqs.length; j++) {
              
            if(String(preReqs[i]._id) === String(coursePreReqs[j]._id)) {
              
                // Return if common element found
                return true;
            }
        }
    }
      
    // Return if no common element exist
    return false; 
}

function findCommonCourse(preReqs, coursePreReqs){

    for(let i = 0; i < preReqs.length; i++) {
       
     for(let j = 0; j < coursePreReqs.length; j++) {
           
         if(String(preReqs[i]._id) === String(coursePreReqs[j]._id)) {
           
             // Return the common element found
             return preReqs1[i];
         }
     }
 }
   
 // Return if no common element exist
    return null; 
}

function containsCourse(course, courseList) {
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



async function getFlexCourses(courses){
    let Requirementfullied = false;
    const emptyArray = [];
    
    for(course of courses) {
        if(course.grade < 12){
            Requirementfullied  = true;
        }
    }

    if(Requirementfullied === true){
        return emptyArray;
    }
    else
        return getCoursesDetails(courses);
}

async function getMajorCourses(courses){
    
        const untakenMajorCourses = courses.filter(course => course.grade > 9 && course.grade < 14);


        return getCoursesDetails(untakenMajorCourses);

}

async function getNextSemesterCourses(courses){

    const preReqCourses = [];
    const preReqsRequired = [];
    const nextSemesterCoursesByImporatance = [];
    const coursesRequired = [];

    // get Preq Courses of courses
    for(course of courses){
        let i = 0;
        for(preReq of course.preReq){
        let preReqCourse = await Courses.findById(preReq)
            if(!containsCourse(preReqCourse, preReqCourses)){
                preReqCourses.push(preReqCourse);
            }
        }
    }
    for(preReqCourse of preReqCourses){
            if(containsCourse(preReqCourse, courses)){preReqsRequired.push(preReqCourse)}
    }



    for(course of courses){
        if(!containsCourse(course, coursesRequired)){
            if(!findIfCommonCourse(preReqsRequired, course.preReq) && containsCourse(course, preReqsRequired)){
                //console.log("adding:", course)
                coursesRequired.push({...course, crucial: true});
            }
            else if(!findIfCommonCourse(course.preReq, preReqsRequired)){
                    //console.log("2adding:", course)
                    coursesRequired.push({...course, important: true}) 
            }
        }

        

    }
    return coursesRequired;

}

async function getEnglishCourses(courses){
        const untakenEnglishCourses = courses.filter(course => course.grade > 9  && course.grade < 14);

        return getCoursesDetails(untakenEnglishCourses);

}


module.exports = {
    getNextSemesterCourses,
    getEnglishCourses,
    getMajorCourses,
    getFlexCourses
};