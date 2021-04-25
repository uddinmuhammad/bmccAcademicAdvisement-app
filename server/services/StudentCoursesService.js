const StudentCourses = require('../models/StudentCoursesModel');
const student = require('../models/StudentModel');


exports.addCoursesToStudent = (req, res) => {

    StudentCourses.findOne( {student: req.body.student})
    .exec((error, studentCourses) => {
        if(error) return res.status(400).json( {error} );
        if(studentCourses){
            //if students courses already exists then update courses by adding requested courses

            StudentCourses.findOneAndUpdate({student: req.body.student}, {
                "$push": {
                    "worldCulturesAndGlobalIssuesCourses": req.body.worldCulturesAndGlobalIssuesCourses
                }
            })
            .exec((error, studentCourses) => {
                if(error) return res.status(400).json({error});
                if(studentCourses){
                    res.status(201).json({ studentCourses });
                }
            })
        }
        else{
            const studentCourses = new StudentCourses({
                student: req.body.student,
                courses: req.body.courses
            });
            studentCourses.save((error, studentCourses) => {
                if(error) return res.status(400).json({error});
                if(studentCourses){
                    res.status(201).json({ studentCourses });
                }
            })
        }
    })


}