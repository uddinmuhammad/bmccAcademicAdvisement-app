const express = require('express');
const mongoose = require('mongoose');
const Students = require('../../models/StudentModel');
const Courses = require('../../models/CourseModel');
//const StudentService = require('../../services/StudentService');
const toId = mongoose.Types.ObjectId;

let StudentDetailsRouter = express.Router();

let courses = [
    {
    code: "DEMO-123",
    title: "DEMO1",
    credits: 3,
    major:["CS", "CIS"]
    },
    {
        code: "DEMO-123",
        title: "DEMO2",
        credits: 3,
        major:["CIS", "GIS"]
    },
    {
        code: "DEMO-123",
        title: "DEMO3",
        credits: 3,
        major:["GIS", "CS"]
    }
]

StudentDetailsRouter.get('/studentdetails', (req, res) => {

    Courses.insertMany(courses);

    // Students.find({major: 'CS'})
    // res.json(students);
    // Students.insertMany(students)
    // .then(res => {
    //     console.log('All students inserted... ' + res)
    // })
    // .catch(e => {
    //     console.log(e)
    // });


    // Students.find({}, (err, students) => {

    //     // if ( err ) {
    //     //     console.log('Error occured while getting records');
    //     //     res.json(err);
    //     // } else {
    //     //     studentMap = {}

    //     //     students.forEach(function(student) {
    //     //     studentMap[student._id] = student._id;
    //     //   });
          
          

    //      //Students.find({empleId: 12345678}).populate('courses');
    //     //}
    //     res.send(students);

    // })

    // Courses.find({CS: true}).populate('Student')
    // exec(function (err, story) {
    //     if (err) return handleError(err);
    //     console.log('The author is %s', story.author.name);
    //     // prints "The author is Ian Fleming"
    //   });
    

    

})


module.exports = StudentDetailsRouter;