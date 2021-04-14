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

    allCourse.insertMany(courses)
    .then(res => {
        console.log('All courses inserted... ' + res)
    })
    .catch(e => {
        console.log(e)
    });

    res.json(courses);
});




// export default coursesRequiredRouter;

module.exports = coursesRequiredRouter;