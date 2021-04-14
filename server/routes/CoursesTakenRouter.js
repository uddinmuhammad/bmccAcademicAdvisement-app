// import express from 'express';
const express = require('express');

var coursesTakenRouter = express.Router();

let courses = [
    {id: 1,
        title: "Intermediate Algebra and Precalculus",
        code: "MAT-206.5",
        credits: 4
    },
    {id: 2,
        title: "English Composition",
        code: "ENG-101",
        credits: 3
    },
    {id: 3,
        title: "Principles in Information Technology and Computation",
        code: "CSC-101",
        credits: 3
    },
    {id: 4,
        title: "Discrete Structure and Applications to Computer Science",
        code: "CSC-231",
        credits: 3
    },
    {id: 5,
        title: "Fundamentals of Computer Systems",
        code: "CSC-215",
        credits: 3
    },
    {id: 6,
        title: "Data Structures",
        code: "CSC-331",
        credits: 3
    }
]

coursesTakenRouter.get('/coursesTaken', (req, res) => {
    res.json(courses);
});

// export default coursesTakenRouter;

module.exports = coursesTakenRouter;