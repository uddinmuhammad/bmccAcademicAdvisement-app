const express = require('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const connectDB = require('./database.js')

require('dotenv').config();

const CoursesCurrent = require ('./routes/CoursesCurrentRouter.js');
const CoursesNextSemesterRouter = require ('./routes/CoursesNextSemesterRouter.js');
const CoursesRequiredRouter = require ('./routes/CoursesRequiredRouter.js');
const CoursesTakenRouter = require ('./routes/CoursesTakenRouter.js');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));


connectDB();

// routes
app.use('/api', CoursesRequiredRouter);
app.use('/api', CoursesCurrent);
app.use('/api', CoursesTakenRouter);
app.use('/api', CoursesNextSemesterRouter);
app.use('/api', require ('./routes/fetchRouter.js'));

app.get('/', (req, res) => res.send('API Running'));
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
