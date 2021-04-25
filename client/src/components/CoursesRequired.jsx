import React, { Component } from 'react'
import axios from 'axios';
import config from '../config/app_config.json';

export default class CoursesRequired extends Component {

        state = {
            courses: [    
                {
                    code: "NONE",
                    title: "NO MORE COURSE IS Required",
                    credits: 0,
                    CIS: false,
                    CNT: false,
                    CS: false,
                    GIS: false,
                    englishComp: false,
                    creativeExpression: false,
                    individualAndSociety: false,
                    usExperienceInItsDiversity: false,
                    worldCulturesAndGlobalIssues: false
                }
            ]
        };

    componentDidMount = () => {

        var URI = config.base_url+config.courses_required;

        axios.get(URI).then(response => {
            // console.log(response.data);
            this.setState({
                courses: response.data
            })
        })
    
    }

    render() {
        // console.log("classes needed Rendered    " + JSON.stringify(this.state.Courses));
        // const {individualAnSocietyCourses} = {this.getIndividualAndSociety};
        return (
            <div className="container" id="needToTake">

                <div>
                    <h5>Major Courses</h5>
                    {this.state.courses.filter(course => course.CIS || course.CNT || course.CS || course.GIS).map(course => (
                        <div key={course.id}>
                            {course.title} - {course.code} - {course.credits}
                        </div>
                    ))}
                </div>
                <div>
                    <h5>English Composition</h5>
                    {this.state.courses.filter(course => course.englishComp).map(course => (
                        <div key={course.id}>
                        {course.title} - {course.code} - {course.credits}
                    </div>
                    ))}
                </div>
                <div>
                    <h5>Creative Expression Courses</h5>
                    <i>(Taken one of the following course)</i>
                    {this.state.courses.filter(course => course.creativeExpression).map(course => (
                        <div key={course.id}>
                        {course.title} - {course.code} - {course.credits}
                    </div>
                    ))}
                </div>
                <div>
                    <h5>Individual And Society Courses</h5>
                    <i>(Taken one of the following course)</i>
                    {this.state.courses.filter(course => course.individualAndSociety).map(course => (
                        <div key={course.id}>
                        {course.title} - {course.code} - {course.credits}
                    </div>
                    ))}
                </div>
                <div>
                    <h5>U.S Experience In Its Diversity Courses </h5>
                    <i>(Taken one of the following course)</i>
                    {this.state.courses.filter(course => course.usExperienceInItsDiversity).map(course => (
                        <div key={course.id}>
                        {course.title} - {course.code} - {course.credits}
                    </div>
                    ))}
                </div>
                <div>
                    <h5>World Cultures And Global Issues Courses</h5>
                    <i>(Taken one of the following course)</i>
                    {this.state.courses.filter(course => course.worldCulturesAndGlobalIssues).map(course => (
                        <div key={course.id}>
                        {course.title} - {course.code} - {course.credits}
                    </div>
                    ))}
                </div>
            
            </div>
        )
    }
}