const express = require('express');
const mongoose = require('mongoose');
const StudentCourses = require('../../models/StudentCoursesModel');
const Courses = require('../../models/CourseModel');
const {addCoursesToStudent} = require('../../services/StudentCoursesService')

let StudentCoursesRouter = express.Router();

StudentCoursesRouter.post('/studentcourses', addCoursesToStudent);

module.exports = StudentCoursesRouter;
