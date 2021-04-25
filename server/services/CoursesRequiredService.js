const mongoose = require('mongoose');
const { listenerCount } = require('../models/CourseModel');
var ObjectId = mongoose.Types.ObjectId;

const Courses = require('../models/CourseModel');
const StudentCourses = require('../models/StudentCoursesModel');

let untakenMajorCourses = [];

function containsCourse(course, courseList) {
    let i;
    for (i = 0; i < courseList.length; i++) {
        if (String(course._id) === String(courseList[i]._id)) {
            // console.log("Was not Added", course)
            return true;
        }
    }
    return false;
}

async function getCoursesDetails(courses){
    const coursesDetails = [];
    for(course of courses){
        coursesDetails.push(await Courses.findById(course.course));
        //console.log(await Courses.findById(course.course));
    }

    return courseDetails;
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
        return creativeExpressionCourses;
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
        return individualAndSocietyCourses;
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
        return usExperienceCourses;
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
        return worldCulturesCourses;
    }
    else
        return noWorldCulturesCourses;
}

async function getMajorCourses(courses){
    
        untakenMajorCourses = courses.filter(course => course.grade > 9 && course.grade < 14);


        return untakenMajorCourses;

}

async function getNextSemesterCourses(allCourses){

    const student = await StudentCourses.findOne({"student": '607e853523cd756ff31227d5'})
    //const courses = student.courses
    const courses = await allCourses.filter(course => course.grade > 9 && course.grade < 14);
    //console.log(courses)

    const nextSemesterCourses = [];
    const requiredCourses = [];
    const coursesDetails = [];

    let preReqFulfilled = true;
    const preReqCourses = [];
    const coursesRequired = []

    for(course of courses){
        coursesDetails.push(await Courses.findById(course.course));
    }

    for(courseD of coursesDetails){
        if(courseD.preReq.length != 0){
            // console.log("This is the course", courseD)

            for(let i = 0; i < courseD.preReq.length; i++){
            const course = await Courses.findById(courseD.preReq[i])
                if(!containsCourse(course, preReqCourses)){
                    preReqCourses.push(course)
                    // console.log("This PreReq was added", course)
                }
            }
        }
        }
    // console.log(preReqCourses)
    //console.log(coursesDetails)

    for(preReqCourse of preReqCourses){
        if(containsCourse(preReqCourse, coursesDetails)){coursesRequired.push(preReqCourse)}
    }

    // console.log("Required",coursesRequired);

    // for(courseRequired of coursesRequired){
    //     for(course of coursesDetails){
    //         if(containsCourse(coursesRequired, course.preReq))
    //     }
    // }


    // for(course of coursesDetails){
    //     if(!containsCourse(course, preReqCourses))
    //         nextSemesterCourses.push(course);
    // }

    // for(let i = 0; i < preReqCourses.length; i++){
    //     for(pr of preReqCourses){
    //         if(String(courses[i].course) === String(preReqCourses[i]._id)) preReqFulfilled = false;
    //         else{
    //             nextSemesterCourses.push(course);
    //         }
    //     }
    // }

    //console.log( "Pre:",preReqIds)
    //console.log(nextSemesterCourses)
    return nextSemesterCourses;
    



}

async function getEnglishCourses(student){
    const englishCourses = student.englishCourses;
    let untakenEnglishCourses;
    
        untakenEnglishCourses = englishCourses.filter(course => course.grade > 9  && course.grade < 14);

        return untakenEnglishCourses;

}


exports.CoursesRequired = async (req, res) => {


    // Courses.insertMany(courses)
    // .catch((error) => {
    //     console.log(error);
    // })


    const student = await StudentCourses.findOne({"student": '607e853523cd756ff31227d5'})
    //majorCourses = 

    if(!student) res.json('there is no student')
    else{
        //const majorCourses = await getMajorCourses(student.courses);
        const englishCourses =  await getEnglishCourses(student);

        const majorCourses = await getNextSemesterCourses(student.courses);
        

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


        const coursesDetails = [];
  
        for(course of newUntakenCourses){
            // coursesDetails.push(getCoursesDetails(newUntakenCourses));
            coursesDetails.push(await Courses.findById(course.course));
            // console.log(await Courses.findById(course.course));
        }

        res.json(coursesDetails);
    }

   }


exports.studentCoursesRequired = async (req, res) => {

    const student = await StudentCourses.findOne({"student": '607e853523cd756ff31227d5'});//({"student": '607e853523cd756ff31227d5'}, (err, student) =>{

        // await StudentCourses.find({student}, (err, courses) => {
        //     res.json(student._id)
        // })

        // let courses = [] 
        // courses = student.courses
        // console.log(JSON.stringify(student));
        // res.json(courses);

        // res.json('Woringg');
    //})

    if(!student) res.json('there is no student')
    else{
        const courses = student.courses;
        const untakenCourses = courses.filter(course => course.grade > 11);
        res.json(untakenCourses);
    }
}
