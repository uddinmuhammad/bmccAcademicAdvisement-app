
const express = require('express');
var CoursesCurrentRouter = express.Router();
const Courses = require('../models/CourseModel');
const StudentCourses = require('../models/StudentCoursesModel');


CoursesCurrentRouter.get('/CoursesCurrent', async (req, res) => {
  const student = await StudentCourses.findOne({"student": '607e853523cd756ff31227d5'})

  if(!student) res.json('there is no student')
  else{
      const courses = student.courses;
      const takingCourses = courses.filter(course => course.grade > 13);


      const coursesDetails = [] 

      for(course of takingCourses){
          coursesDetails.push(await Courses.findById(course.course));
      }
      res.json(coursesDetails);
  }
});


module.exports = CoursesCurrentRouter;
