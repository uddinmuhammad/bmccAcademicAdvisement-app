const Courses = require('../models/CourseModel');
const StudentCourses = require('../models/StudentCoursesModel');
const mongoose = require('mongoose');

let individualAndSocietyCourses = ['khan', 'paan', 'shann']

exports.checkIndividualAndSocietyCoursesRequirments = async (req, res) => {

    const student = await StudentCourses.findOne({"student": '607e853523cd756ff31227d5'})
    individualAndSocietyCourses = student.individualAndSocietyCourses;
    const checkIndividualAndSocietyCourses = false;
    const coursesDetails = [];

    console.log(individualAndSocietyCourses);
    res.json(individualAndSocietyCourses)
}
