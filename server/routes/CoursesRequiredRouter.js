// import express from 'express';
const express = require('express');
const allCourse = require('../models/MajorCourses');

var coursesRequiredRouter = express.Router();

let courses = [
    {
        title: "University Physics",
        code: "PHY-221",
        credits: 4
    },
    {
        title: "Analytics Geometry & Calculus II",
        code: "MAT-302",
        credits: 4
    },
    {
        title: "Anvanced Programing Techniquies",
        code: "CSC-211",
        credits: 3
    },
    {
        title: "Discrete Structure and Applications to Computer Science",
        code: "CSC-231",
        credits: 3
    },
    {
        title: "Fundamentals of Computer Systems",
        code: "CSC-215",
        credits: 3
    },
    {
        title: "Data Structures",
        code: "CSC-331",
        credits: 3
    }
]

coursesRequiredRouter.get('/coursesRequired', (req, res) => {

    // allCourse.insertMany(courses)
    // .then(res => {
    //     console.log('All courses inserted... ' + res)
    // })
    // .catch(e => {
    //     console.log(e)
    // });

    // allCourse.find({}, (err, courses) => {

    //     if ( err ) {
    //         console.log('Error occured while getting records');
    //         res.json(err);
    //     } else {

    //         courseMap = {}

    //         courses.forEach(function(course) {
    //         courseMap[course._id] = course;
    //       });
          
    //       res.send(courses); 

    //     }

    // })

    allCourse.findOne({title: "University Physics"}, (err, result) => {
        if ( err ) {
            console.log('Error occured while getting records');
            res.json(err);
        } else {
            res.send(result);
        }
    })
});




// export default coursesRequiredRouter;

module.exports = coursesRequiredRouter;