import React, { Component } from 'react'

export default class CourseCurrent extends Component {

    render() {
        const { courses } = this.props;
        return (
            <div>
            <hr />
              {courses.map((course) => {
                return (
                  <div key={course.id}>
                      <li > {course.name}</li>
                  </div>
                );
              })}
          </div>
        )
    }
}
