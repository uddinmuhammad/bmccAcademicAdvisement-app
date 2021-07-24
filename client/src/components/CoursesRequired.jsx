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
                    major: [],
                    courseType: [],
                    creativeExpression: false,
                    individualAndSociety: false,
                    usExperienceInItsDiversity: false,
                    worldCulturesAndGlobalIssues: false
                }
            ]
        };

    getMajors = () =>{
        const majors = 'CSProgramElective';

        return majors;
    }

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
                    {this.state.courses.filter(course => course.major.includes("CS", 'CIS', 'CNT', 'GIS')).map(course => (
                        <div key={course.id}>
                            {course.title} - {course.code} - {course.credits}
                        </div>
                    ))}
                </div>
                <div>
                    <h5>English Composition</h5>
                    {this.state.courses.filter(course => course.courseType.includes("englishComposition")).map(course => (
                        <div key={course.id}>
                        {course.title} - {course.code} - {course.credits}
                    </div>
                    ))}
                </div>
                <div>
                    <h5>Creative Expression Courses</h5>
                    <i>(Take one of the following course)</i>
                    {this.state.courses.filter(course => course.courseType.includes("creativeExpression")).map(course => (
                        <div key={course.id}>
                        {course.title} - {course.code} - {course.credits}
                    </div>
                    ))}
                </div>
                <div>
                    <h5>Individual And Society Courses</h5>
                    <i>(Take one of the following course)</i>
                    {this.state.courses.filter(course => course.courseType.includes("individualAndSociety")).map(course => (
                        <div key={course.id}>
                        {course.title} - {course.code} - {course.credits}
                    </div>
                    ))}
                </div>
                <div>
                    <h5>U.S Experience In Its Diversity Courses </h5>
                    <i>(Take one of the following course)</i>
                    {this.state.courses.filter(course => course.courseType.includes("usExperienceInItsDiversity")).map(course => (
                        <div key={course.id}>
                        {course.title} - {course.code} - {course.credits}
                    </div>
                    ))}
                </div>
                <div>
                    <h5>World Cultures And Global Issues Courses</h5>
                    <i>(Take one of the following course)</i>
                    {this.state.courses.filter(course => course.courseType.includes("worldCulturesAndGlobalIssues")).map(course => (
                        <div key={course.id}>
                        {course.title} - {course.code} - {course.credits}
                    </div>
                    ))}
                </div>

                <div>
                    <h5>Program Electives</h5>
                    <i>Take atleast 6 credits</i>
                    {this.state.courses.filter(course => course.courseType.includes("CSProgramElective", "CISProgramElective", "CNTProgramElective", "GISProgramElective")).map(course => (
                        <div key={course.id}>
                            {course.title} - {course.code} - {course.credits}
                        </div>
                    ))}
                </div>
            
            </div>
        )
    }
}