import React, { Component } from 'react'
import axios from 'axios';
import config from '../config/app_config.json';
export default class CoursesTaken extends Component {
    state = {
        coursesTaken: [
            {
                id: 786,
                title: "No Course has been Taken"
            }
        ]
    };

    componentDidMount = () => {
        var URI = config.base_url+config.courses_Taken

        axios.get(URI).then(response => {
            // console.log(response.data);
            this.setState({
                coursesTaken: response.data
            })
        })
        
    }

    render() {
        return (
            <div className="container" id="previousCourses">
                <h5>Courses Taken</h5>
                {this.state.coursesTaken.map(course => (
                    <div key={course.id}>
                         {course.title} - {course.code} - {course.credits}
                    </div>
                ))}
            </div>
        )
    }
}
