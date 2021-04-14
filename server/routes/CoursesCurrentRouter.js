// import express from 'express';
// import myCourses from '../../client/src/components/myCourses';
const express = require('express');
var CoursesCurrentRouter = express.Router();

let courses = [
    {
        id: 1,
        title: "Programing",
        credits: 3
      },
      {
        id: 2,
        title: "English",
        credits: 3
      },
      {
        id: 3,
        title: "Speech",
        credits: 3
      }
]

CoursesCurrentRouter.get('/CoursesCurrent', (req, res) => {
    res.json(courses);
});

// export default CoursesCurrentRouter;
module.exports = CoursesCurrentRouter;
