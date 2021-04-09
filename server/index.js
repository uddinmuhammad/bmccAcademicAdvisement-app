// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// import CoursesCurrent from './routes/CoursesCurrentRouter.js';
// import CoursesNextSemesterRouter from './routes/CoursesNextSemesterRouter.js';
// import CoursesRequiredRouter from './routes/CoursesRequiredRouter.js';
// import CoursesTakenRouter from './routes/CoursesTakenRouter.js';
// import AllCourses from './models/allMajorCourses';

const express = require('express');
const mongoose = require ('mongoose');
const cors = require ('cors');

const CoursesCurrent = require ('./routes/CoursesCurrentRouter.js');
const CoursesNextSemesterRouter = require ('./routes/CoursesNextSemesterRouter.js');
const CoursesRequiredRouter = require ('./routes/CoursesRequiredRouter.js');
const CoursesTakenRouter = require ('./routes/CoursesTakenRouter.js');
const AllMajorCourses = require ('./models/allMajorCourses');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
  

//Mongo DataBase
const CONNECTION_URL = 'mongodb+srv://advismentAdmin:Bmcc1234@cluster0.qqxur.mongodb.net/allMajorCourse?retryWrites=true&w=majority'
const PORT = process.env.PORT = 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: `)))
    .catch((error) => {
        console.log("ERROOOEEEE")
        console.log(error.message)
    });

mongoose.set('useFindAndModify', false);

//Routes without routes
app.get('/allcourses', async(req, res) => {
    const courses = await AllMajorCourses.find({})
    console.log(courses)
    res.send('ALL Courses WILL BE HERE');
})

// routes
app.use('/api', CoursesRequiredRouter);
app.use('/api', CoursesCurrent);
app.use('/api', CoursesTakenRouter);
app.use('/api', CoursesNextSemesterRouter);

app.listen(3001, function() {
    console.log("Express server is running on port 3001");
})
