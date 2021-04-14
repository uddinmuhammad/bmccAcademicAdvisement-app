// import express from 'express';
const express = require('express');
var coursesNextSemesterRouter = express.Router();

let courses = [
    {id: 1,
        title: "Introdustion to programming",
        code: "CSC-111",
        credits: 3,
        crucial: true,
        important: false,
        shouldTake: false
    },
    {id: 2,
        title: "Analytics Geometry & Calculus I",
        code: "MAT-301",
        credits: 4,
        crucial: true,
        important: false,
        shouldTake: false
    },
    {id: 3,
        title: "Introduction to Literature",
        code: "ENG-201",
        credits: 3,
        crucial: false,
        important: true,
        shouldTake: false
    },
    {id: 4,
        title: "Fundamentals of Public Speaking",
        code: "SPE-100",
        credits: 3,
        crucial: false,
        important: true,
        shouldTake: false
    },
    {id: 5,
        title: "U.S. Experience in Its Diversity",
        code: "XXX-xxx",
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