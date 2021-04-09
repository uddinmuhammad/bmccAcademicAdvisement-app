// import express from 'express';
const express = require('express');
var coursesNextSemesterRouter = express.Router();

let courses = [
    {id: 1,
        courseTitle: "Introdustion to programming",
        courseCode: "CSC-111",
        credits: 3,
        crucial: true,
        important: false,
        shouldTake: false
    },
    {id: 2,
        courseTitle: "Analytics Geometry & Calculus I",
        courseCode: "MAT-301",
        credits: 4,
        crucial: true,
        important: false,
        shouldTake: false
    },
    {id: 3,
        courseTitle: "Introduction to Literature",
        courseCode: "ENG-201",
        credits: 3,
        crucial: false,
        important: true,
        shouldTake: false
    },
    {id: 4,
        courseTitle: "Fundamentals of Public Speaking",
        courseCode: "SPE-100",
        credits: 3,
        crucial: false,
        important: true,
        shouldTake: false
    },
    {id: 5,
        courseTitle: "U.S. Experience in Its Diversity",
        courseCode: "XXX-xxx",
        credits: 4,
        crucial: false,
        important: false,
        shouldTake: true
    }
]

coursesNextSemesterRouter.get('/coursesNextSemester', (req, res) => {
    res.json(courses);
});

// export default coursesNextSemesterRouter;

module.exports = coursesNextSemesterRouter;