// import express from 'express';
const express = require('express');

var coursesTakenRouter = express.Router();

let courses = [
    {id: 1,
        courseTitle: "Intermediate Algebra and Precalculus",
        courseCode: "MAT-206.5",
        credits: 4
    },
    {id: 2,
        courseTitle: "English Composition",
        courseCode: "ENG-101",
        credits: 3
    },
    {id: 3,
        courseTitle: "Principles in Information Technology and Computation",
        courseCode: "CSC-101",
        credits: 3
    },
    {id: 4,
        courseTitle: "Discrete Structure and Applications to Computer Science",
        courseCode: "CSC-231",
        credits: 3
    },
    {id: 5,
        courseTitle: "Fundamentals of Computer Systems",
        courseCode: "CSC-215",
        credits: 3
    },
    {id: 6,
        courseTitle: "Data Structures",
        courseCode: "CSC-331",
        credits: 3
    }
]

coursesTakenRouter.get('/coursesTaken', (req, res) => {
    res.json(courses);
});

// export default coursesTakenRouter;

module.exports = coursesTakenRouter;