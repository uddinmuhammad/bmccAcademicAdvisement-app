const express = require('express');
const mongoose = require('mongoose');
const Students = require('../../models/StudentModel');
const Courses = require('../../models/CourseModel');
//const StudentService = require('../../services/StudentService');
const toId = mongoose.Types.ObjectId;

let StudentDetailsRouter = express.Router();



// let students = [
//     {
//     emplId: 12345678,
//     name:{
//         firstName: "John",
//         lastName: "Doe"
//     },
//     email: "johndoe@bmcc.com",
//     phoneNumber: 1234567890,
//     major: 'CS',
//     },
//     {
//         emplId: 12345678,
//         name:{
//             firstName: 'John',
//             lastName: 'Doe'
//         },
//         email: 'johndoe@bmcc.com',
//         phoneNumber: 1234567890,
//         major: 'CIS',
//         },

// ]

StudentDetailsRouter.get('/studentdetails', (req, res) => {

    // Students.find({major: 'CS'})
    // res.json(students);
    // Students.insertMany(students)
    // .then(res => {
    //     console.log('All students inserted... ' + res)
    // })
    // .catch(e => {
    //     console.log(e)
    // });


    Students.find({}, (err, students) => {

        // if ( err ) {
        //     console.log('Error occured while getting records');
        //     res.json(err);
        // } else {
        //     studentMap = {}

        //     students.forEach(function(student) {
        //     studentMap[student._id] = student._id;
        //   });
          
          

         //Students.find({empleId: 12345678}).populate('courses');
        //}
        res.send(students);

    })

    // Courses.find({CS: true}).populate('Student')
    // exec(function (err, story) {
    //     if (err) return handleError(err);
    //     console.log('The author is %s', story.author.name);
    //     // prints "The author is Ian Fleming"
    //   });
    

    

})


module.exports = StudentDetailsRouter;