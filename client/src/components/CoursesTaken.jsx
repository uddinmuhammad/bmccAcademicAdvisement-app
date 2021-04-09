import React, { Component } from 'react'
import axios from 'axios';

export default class CoursesTaken extends Component {
    state = {
        coursesTaken: [
            {
                id: 786,
                courseTitle: "No Course has been Taken"
            }
        ]
    };

    componentDidMount = () => {
        axios.get("/api/coursesTaken").then(response => {
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
                         {course.courseTitle} - {course.courseCode} - {course.credits}
                    </div>
                ))}
            </div>
        )
    }
}
