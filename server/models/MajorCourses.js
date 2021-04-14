// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const db = require('../database.js');

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: false
    }, 
    title: {
        type: String,
        required: false
    },
    credits: {       
        type: Number,
        required: false
    }
})

courseTable = mongoose.model('MajorCourses',courseSchema);

// module.exports={
     
//     fetchData:function(callback){
//        var courseData = courseTable.find({});
//        courseData.exec(function(err, data){
//            if(err) throw err;
//            return callback(data);
//        })
       
//     }
// }

// const allCourse = mongoose.model('Course', courseSchema)

export default allCourse;
// module.exports = allCourse;