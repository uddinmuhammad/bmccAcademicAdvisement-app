import React, { Component } from 'react'
import Class from './CourseCurrent';
import axios from 'axios'

export default class CoursesCurrent extends Component {
    
    state = {
        coursesCurrent: [
          {
            id: 123,
            title: "NOCOURSE",
            credits: 3
          }
        ]
      };


  componentDidMount = () => {
      axios.get("/api/CoursesCurrent").then(response => {
          // console.log(response.data);
          this.setState({
            coursesCurrent: response.data
          })
      })
    }



      render() {
        const { coursesCurrent} = this.state;

        return (
          <div className="container">
            <Class courses={coursesCurrent} />
          </div>
        );
      }
}
