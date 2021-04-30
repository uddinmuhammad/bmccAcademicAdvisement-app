
const express = require('express');
var CoursesCurrentRouter = express.Router();
const Courses = require('../models/CourseModel');
const StudentCourses = require('../models/StudentCoursesModel');


CoursesCurrentRouter.get('/CoursesCurrent', async (req, res) => {
  const student = await StudentCourses.findOne({"student": '6088e09d34934fa514246b56'})

  if(!student) res.json('there is no student')
  else{
      const courses = (student.courses)
        .concat(student.englishCourses)
        .concat(student.creativeExpressionCourses)
        .concat(student.individualAndSocietyCourses)
        .concat(student.usExperienceInItsDiversityCourses)
        .concat(student.worldCulturesAndGlobalIssuesCourses)
        .concat(student.programElectiveCourses)
      const takingCourses = courses.filter(course => course.grade == 14);


      const coursesDetails = [] 

      for(course of takingCourses){
          coursesDetails.push(await Courses.findById(course.course));
      }
      res.json(coursesDetails);
  }
});


module.exports = CoursesCurrentRouter;
