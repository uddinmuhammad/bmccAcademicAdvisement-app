// import express from 'express';
const express = require('express');
const Courses = require('../models/CourseModel');
const StudentCourses = require('../models/StudentCoursesModel');

var coursesNextSemesterRouter = express.Router();

let courses = [
    {id: 1,
        title: "Introdustion to programming",
        code: "CSC-111",
        credits: 3,
        crucial: true,
        important: false,
        shouldTake: false
    },
    {id: 2,
        title: "Analytics Geometry & Calculus I",
        code: "MAT-301",
        credits: 4,
        crucial: true,
        important: false,
        shouldTake: false
    },
    {id: 3,
        title: "Introduction to Literature",
        code: "ENG-201",
        credits: 3,
        crucial: false,
        important: true,
        shouldTake: false
    },
    {id: 4,
        title: "Fundamentals of Public Speaking",
        code: "SPE-100",
        credits: 3,
        crucial: false,
        important: true,
        shouldTake: false
    },
    {id: 5,
        title: "U.S. Experience in Its Diversity",
        code: "XXX-xxx",
        credits: 4,
        crucial: false,
        important: false,
        shouldTake: true
    }
]




coursesNextSemesterRouter.get('/coursesNextSemester', async (req, res) => {
    const student = await StudentCourses.findOne({"student": '607e853523cd756ff31227d5'});

    const majorCourses = student.courses;
    
    untakenMajorCourses = majorCourses.filter(course => course.grade >= 9 && course.grade != 14);

    const coursesDetails = [];
    const c = {crucial: true};

    for(course of untakenMajorCourses){
        coursesDetails.push(await Courses.findById(course.course));
    }

    // for(course of coursesDetails){
    //     course = {...course, ...c};
    //     //console.log(course)
    //     course.save();
    // }

    var result = coursesDetails.map(function(el) {
        var o = Object.assign({}, el);
        o.crucial = true;
        return o;
      })
      
    //   console.log(coursesDetails);
    //   console.log(result);


    res.json(result)
     //console.log(coursesDetails);

});

// export default coursesNextSemesterRouter;

module.exports = coursesNextSemesterRouter;