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

async function getCourseDetails(course){
    const courseDetails = await Courses.findById(course.course);

    return courseDetails;
}

async function getCoursesDetails(courses){
    const coursesDetails = [];
    for(course of courses){
        coursesDetails.push(await Courses.findById(course.course));
    }

    return coursesDetails;
}

async function getCourseCredits(course){
    const courseDetails = await Courses.findById(course.course);

    const courseCredits = courseDetails.credits
    //console.log(courseCredits);

    return courseCredits;
}

function getPreReqs(course){
    const preReqs = []
    for(let i = 0; i < course.preReq.length; i++){
        preReqs.push(course.preReq[i]) 
    }

    return preReqs;
}

async function getPreReqsDetails(preReqs){
    const preReqsDetails = [];
    //if(preReqs.length >=1 ){
    for(preReq of preReqs)
        preReqsDetails.push(await Courses.findById(preReq))

    return preReqsDetails;
}

async function getFlexCoursesRequired(courses){
    let Requirementfullied = false;
    const emptyArray = [];
    
    for(course of courses) {
        if(course.grade < 12 || course.grade == 14){
            Requirementfullied  = true;
        }
    }

    if(Requirementfullied === true){
        //return false
        return emptyArray;
    }
    else
        return getCoursesDetails(courses);
        //return true;
}

async function getNextSemesterFlexCourses(courses){
    let Requirementfullied = false;
    const emptyArray = [];
    
    for(course of courses) {
        if(course.grade < 12 || course.grade == 14){
            Requirementfullied  = true;
        }
    }

    if(Requirementfullied === true){
        return false
        //return emptyArray;
    }
    else
        //return getCoursesDetails(courses);
        return true;
}

async function getMajorCourses(courses){
    
        const untakenMajorCourses = courses.filter(course => course.grade > 9 && course.grade < 14);


        return getCoursesDetails(untakenMajorCourses);

}

async function getTakenCourses(courses){
    const takenCourses = await courses.filter(course => course.grade < 13);
        return getCoursesDetails(takenCourses);
}

async function getNextSemesterProgramElectiveCourses(student, courses){

    const programElectiveCourses = [];
    // console.log("programElectiveCourses: 1:",programElectiveCourses)
    // programElectiveCourses.push(student.programElectiveCourses);

    const untakenCourses = await getUntakenProgramElectiveCourses(courses);
    const takenCourses = (await getTakenCourses(student.courses));
       //console.log("untakenCourses: ",untakenCourses);

    const preReqCourses = [];
    const preReqsRequired = [];
    const coursesRequired = [];

    if(untakenCourses.length >= 1){
        for(untakenCourse of untakenCourses){
            const preReqs = await getPreReqsDetails(untakenCourse.preReq)
            const isAlternativePreReqs = untakenCourse.alternativePreReq;

            let preReqsFullfilled = true
            if(preReqs.length < 1){
                programElectiveCourses.push(untakenCourse);
            }
            if(preReqs.length >= 1){
                for(preReq of preReqs){
                    if(!containsCourse(preReq, takenCourses)) preReqsFullfilled = false;
                }

            if(preReqsFullfilled == false && isAlternativePreReqs){
                
                const alternativePreReqs = await getPreReqsDetails(untakenCourse.alternativePreReq)

                for(preReq of alternativePreReqs){
                    if(!containsCourse(preReq, takenCourses)) preReqsFullfilled = false;
                }
            }
                if(preReqsFullfilled == true){
                    programElectiveCourses.push(untakenCourse);
                }
            }
        }
    
    }
        return programElectiveCourses;

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
                coursesRequired.push({...course, crucial: true});
            }
            else if(!findIfCommonCourse(course.preReq, preReqsRequired))
                    coursesRequired.push({...course, important: true}) 
            }
        }

    return coursesRequired;

}

async function getUntakenCourses(courses){
    const untakenCourses = courses.filter(course => course.grade > 9  && course.grade < 14);

    return getCoursesDetails(untakenCourses);

}

async function getUntakenProgramElectiveCourses(courses){
    
    let creditsCompleted = 0;
    const untakenCourses = [];

    for(course of courses){
        if(course.grade < 9 || course.grade == 14){
            creditsCompleted += await getCourseCredits(course)
        }
        else{
            untakenCourses.push(course);
        }
    }

    if(creditsCompleted >= 6)
        return emptyArray = [];

    else
        return getCoursesDetails(untakenCourses);

}


module.exports = {
    getNextSemesterCourses,
    // getEnglishCourses,
    // getMajorCourses,
    getNextSemesterFlexCourses,
    getFlexCoursesRequired,
    getNextSemesterProgramElectiveCourses,
    getUntakenCourses,
    getTakenCourses,
    getUntakenProgramElectiveCourses
};