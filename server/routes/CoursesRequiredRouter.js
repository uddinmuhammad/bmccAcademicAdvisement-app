// import express from 'express';
const express = require('express');

var coursesRequiredRouter = express.Router();

let courses = [
    {id: 1,
        courseTitle: "University Physics",
        courseCode: "PHY-221",
        credits: 4
    },
    {id: 2,
        courseTitle: "Analytics Geometry & Calculus II",
        courseCode: "MAT-302",
        credits: 4
    },
    {id: 3,
        courseTitle: "Anvanced Programing Techniquies",
        courseCode: "CSC-211",
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

coursesRequiredRouter.get('/coursesRequired', (req, res) => {
    res.json(courses);
});

// export default coursesRequiredRouter;

module.exports = coursesRequiredRouter;