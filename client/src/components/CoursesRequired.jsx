import React, { Component } from 'react'
import axios from 'axios';

export default class CoursesRequired extends Component {

        state = {
            coursesRequired: [    
                {
                    id: 1234,
                    courseTitle: "NO MORE COURSE IS Required"
                }
            ]
        };

    componentDidMount = () => {
        axios.get("/api/coursesRequired").then(response => {
            // console.log(response.data);
            this.setState({
                coursesRequired: response.data
            })
        })
        
    }

    render() {
        console.log("classes needed Rendered    " + JSON.stringify(this.state.CoursesRequired))
        return (
            <div className="container" id="needToTake">
                <h5>Courses Needed</h5>
                {this.state.coursesRequired.map(course => (
                    <div key={course.id}>
                        {course.courseTitle} - {course.courseCode} - {course.credits}
                    </div>
                ))}
            </div>
        )
    }
}
