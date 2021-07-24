
const express = require('express');
var CoursesCurrentRouter = express.Router();
const Courses = require('../models/CourseModel');
const StudentCourses = require('../models/StudentCoursesModel');

const currentCourses = async (student) => {
  const courses = (student.courses)
    .concat(student.englishCourses)
    .concat(student.creativeExpressionCourses)
    .concat(student.individualAndSocietyCourses)
    .concat(student.usExperienceInItsDiversityCourses)
    .concat(student.worldCulturesAndGlobalIssuesCourses)
    .concat(student.programElectiveCourses)

  return courses.filter(course => course.grade == 14);
}

CoursesCurrentRouter.get('/CoursesCurrent', async (req, res) => {
  const student = await StudentCourses.findOne({"student": '6088e09d34934fa514246b56'})

  if(!student) res.json('there is no student')
  else{
      const takingCourses = await currentCourses(student);

      const coursesDetails = [] 

      for(course of takingCourses){
          coursesDetails.push(await Courses.findById(course.course));
      }
      res.json(coursesDetails);
  }
});


CoursesCurrentRouter.put('/CoursesCurrent/:courseId', async (req, res) => {
  
  const student = await StudentCourses.findOne({"student": '6088e09d34934fa514246b56'})
  const {courseId} = req.params;
  const grade = req.body.grade;

  const course = await Courses.findById(courseId);
  // const studentCourse = await StudentCourses.findOneAndUpdate({student: student.student}, {

  // });
  console.log(grade)
  res.send(student)

  const takingCourses = await currentCourses(student)




})

module.exports = CoursesCurrentRouter;