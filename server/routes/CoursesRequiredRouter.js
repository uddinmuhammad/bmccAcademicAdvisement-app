// import express from 'express';
const express = require('express');
const {CoursesRequired, studentCoursesRequired} = require('../services/CoursesRequiredService');
const Courses = require('../models/CourseModel');
const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const CoursesRequiredRouter = express.Router();
const StudentCoursesRequiredRouter = express.Router();
const addPreReqRoute = express.Router();
const addCoReqRoute = express.Router();



CoursesRequiredRouter.get('/coursesRequired', CoursesRequired);
StudentCoursesRequiredRouter.get('/studentCoursesRequired', studentCoursesRequired);
// individualAndSocietyCoursesRouter.get('/individualAndSocietyCourses', individualAndSocietyCourses);

// addPreReqRoute.get("/addPreReq/:course/:preReq", async (req, res) => {
//   req.params.preReq = toId(req.params.preReq)
//   const course = await Courses.findById(req.params.course)
//   course.preReq.push(req.params.preReq) //req.params.prereq
//   course.save();

//   res.json(course);
// })

// addCoReqRoute.get("/add/:course/:coReq", async (req, res) => {
//   req.params.coReq = toId(req.params.coReq)
//   const course = await Courses.findById(req.params.course)
//   course.coReq.push(req.params.coReq) //req.params.prereq
//   course.save();

//   res.json(course);
// });




// export default coursesRequiredRouter;

// module.exports = addPreReqRoute;
module.exports = CoursesRequiredRouter;
// module.exports = StudentCoursesRequiredRouter