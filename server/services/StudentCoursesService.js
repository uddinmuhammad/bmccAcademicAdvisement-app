const StudentCourses = require('../models/StudentCoursesModel');
const Student = require('../models/StudentModel');
const Courses = require('../models/CourseModel');
const { getEnglishCourses } = require('./CourseService');

const courseTypes = ['englishCourses', 'creativeExpressionCourses', 'individualAndSocietyCourses']

async function updateCourses(){
    await Courses.updateMany(
        // 'CISProgramElective', 'CNTProgramElective', 'GISProgramElective'
        {courseType: 'CSProgramElective'},
        //{$unset: {CNTProgramElective: true}},
        {alternativePreReq: ['']},
        //{$push: {courseType: 'CNTProgramElective:'}},
        function(err, numberAffected){  
        });
    console.log("function called!")
}

async function getMajorCourses(major){
    const courses = await Courses.find({major: major})
    const allCourses = [];
    for(let i = 0; i < courses.length; i++){
        allCourses.push({course: courses[i]._id, grade: 13})
    }
    return allCourses;
}

async function getCommonCoreCourses(courseType){
    const courses = await Courses.find({courseType: courseType})
    const commonCoreCourses = [];

    for(let i = 0; i < courses.length; i++){
        commonCoreCourses.push({course: courses[i]._id, grade: 13})
        //console.log("From Loop #", i,":" ,courses[i]);
    }
    return commonCoreCourses;
}

async function getProgramElectiveCourses(major){

    let courses = [];
    const programElectiveCourses = [];
    
    //await Courses.find({courseType: "CSProgramElective"})
    if(String(major) == "CS")
        courses = await Courses.find({courseType: "CSProgramElective"})
        //console.log("CS: ",courses);

    else if(major == "CIS")
        courses = await Courses.find({courseType: "CISProgramElective"})
    
    else if(major == "CNT")
        courses = await Courses.find({courseType: "CNTProgramElective"})
    
    else if(major == "GIS")
        courses.push = await Courses.find({courseType: "GISProgramElective"})

  

    for(let i = 0; i < courses.length; i++){
        programElectiveCourses.push({course: courses[i]._id, grade: 13})
        console.log("From Loop #", i,":" ,courses[i]);
    }

    return programElectiveCourses;
}


exports.addCoursesToStudent = async (req, res) => {


    

    // await updateCourses();
    // res.json("Courses Updated!");


    const student = await Student.findById(req.body.student);


    // StudentCourses.findOne( {student: req.body.student})
    // .exec((error, studentCourses) => {
    //     if(error) return res.status(400).json( {error} );
    //     if(studentCourses){
    //         //if students courses already exists then update courses by adding requested courses

    //         StudentCourses.findOneAndUpdate({student: req.body.student}, {
    //             // "$push": {
    //             //     "programElectiveCourses": req.body.programElectiveCourses
    //             // }
    //             //for(let i = 0; i < courses.length; i++){
    //             "$push": {
    //                 "courses": course
    //             }
    //             //}
    //         })
    //         .exec((error, studentCourses) => {
    //             if(error) return res.status(400).json({error});
    //             if(studentCourses){
    //                 res.status(201).json({ studentCourses });
    //             }
    //         })
    //     }
    //     else{



    /////////
            const studentCourses = new StudentCourses({
                student: req.body.student,
                courses: await getMajorCourses(student.major),
                englishCourses: await getCommonCoreCourses("englishComposition"),
                creativeExpressionCourses: await getCommonCoreCourses("creativeExpression"),
                individualAndSocietyCourses: await getCommonCoreCourses("individualAndSociety"),
                usExperienceInItsDiversityCourses: await getCommonCoreCourses("usExperienceInItsDiversity"),
                worldCulturesAndGlobalIssuesCourses: await getCommonCoreCourses("worldCulturesAndGlobalIssues"),
                programElectiveCourses: await getProgramElectiveCourses(student.major)

            });
            studentCourses.save((error, studentCourses) => {
                if(error) return res.status(400).json({error});
                if(studentCourses){
                    res.status(201).json({ studentCourses });
                }
            })

    //////////
    // }
    //})


}

// look up courses schema by course type, where course type = true, take that