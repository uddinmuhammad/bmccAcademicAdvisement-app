import React, { Component } from 'react'
import './resources.css'

export default class Resources extends Component {
    state = {
        tags: [
          {
            id: 1,
            name: "My Current Courses",
          },
          {
            id: 2,
            name: "Classes to Take",
          },
          {
            id: 3,
            name: "Courses Taken",
          }
        ]
      };

      handleClick = (tagName) =>{
          console.log("Clicked: " + tagName);
      }


    render() {

        return (
            <div className="container" id="resources">
            
              <a href="/" id="aTag">Home</a>
            
            
              <a href="/courses/current" id="aTag">My Current Courses</a>
            
              <a href="/courses/nextsemester" id="aTag">Classes To Take</a>

              <a href="/courses/taken" id="aTag">Courses Taken</a>
          </div>
        );
    }
}
