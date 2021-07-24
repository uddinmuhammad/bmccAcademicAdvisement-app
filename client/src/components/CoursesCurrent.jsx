import React, { Component } from 'react'
import Class from './CourseCurrent';
import axios from 'axios'
import config from '../config/app_config.json';
import AddGrades from './AddGrades';

export default class CoursesCurrent extends Component {
    
    state = {
        courses: [
          {
            code: "NONE",
            title: "NO MORE COURSE IS Required",
            credits: 0,
            grade: 14
          }
        ]
      };



  componentDidMount = () => {

    var URI = config.base_url+config.courses_current

      axios.get(URI).then(response => {
          // console.log(response.data);
          this.setState({
            courses: response.data
          })
      })
    }



      render() {
        const { courses} = this.state;
        console.log("Coming from CoursesCurrent.jsx", courses);

        return (
          <div className="container">
            <Class courses={courses} />
            <AddGrades courses={courses}/>
          </div>
        );
      }
}
