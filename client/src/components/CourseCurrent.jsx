import React, { Component } from 'react'

export default class CourseCurrent extends Component {
  render() {
    const { courses } = this.props
    // console.log(courses);
    return (
      <div>
        <hr />
        {courses.map((course) => {
          return (
            <div className="container" id="needToTake" key={course.id}>
              {course.title} - {course.code} - {course.credits}
            </div>
          )
        })}
      </div>
    )
  }
}
