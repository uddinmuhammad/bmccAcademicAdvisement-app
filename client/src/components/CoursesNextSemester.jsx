import React, { Component } from 'react'
import axios from 'axios';
import config from '../config/app_config.json';

export default class CoursesNextSemester extends Component {
    state = {
        courses:[
            {
                _doc:{
                id: 567,
                title: "NO COURSES Left",
                credit: 0,},
                crucial: true,
                important: true,
                shouldTake: true
            }
        ]
    };

    componentDidMount = () => {
        var URI = config.base_url+config.courses_NextSemester;

        axios.get(URI).then(response => {
            // console.log(response.data);
            this.setState({
                courses: response.data
            })
        })
    }

    getCrucialCourses = () => {
        const {crucialCourses} = this.state.courses.filter(course => course.crucial);
        return crucialCourses;
    }

    getImportantCourses = () => {
        const importantCourses = this.courses.filter(course => course.important);
        return importantCourses;
    }

    getShouldTakeCourses = () => {
        const shouldTake = this.courses.filter(course => course.shouldTake);
        return shouldTake;
    }


    render() {
            console.log("Next semester classes Rendered")
            const {crucials} = (this.getCrucialCourses);
        return (
            <div className="container" id='courses'>

                {/* Rendering Crucials */}
                <div>
                    <h5>Crucial Courses</h5>
                {this.state.courses.filter(course => course.crucial).map(course => (
                    <div key={course.id}> 
                        {course._doc.title} - {course._doc.code} - {course._doc.credits}
                    </div>
                ))}
                </div>

                <div>
                <h5>Important Courses</h5>
                {/* Rendering Importants */}
                {this.state.courses.filter(course => course.important).map(course => (
                    <div key={course.id}>
                        {course._doc.title} - {course._doc.code} - {course._doc.credits}
                    </div>
                ))}
                </div>

                <div>
                <h5>Should take these Courses</h5>
                {/* Rendering ShouldTake */}
                {this.state.courses.filter(course => course.shouldTake).map(course => (
                    <div key={course.id}>
                        <h6>{course.title} - <i>{course.credits}</i></h6>
                    </div>
                ))}
                </div>               
            </div>
        )
    }
}
