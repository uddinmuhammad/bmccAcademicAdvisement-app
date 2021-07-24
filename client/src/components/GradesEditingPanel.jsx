import React, { Component, Fragment, useState, useEffect } from 'react'

const GradesEditingPanel = ({ courses }) => {
  // const [grade, setGrade] = useState(course.grade);

  // // render() {
  //     const { courses } = this.props;
  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
      >
        Add Grades
      </button>

      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Modal Heading</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              {courses.map((course) => {
                return (
                  <div key={course.id}>
                    {course.code}
                    <input type="text"></input>
                  </div>
                )
              })}
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
//}

export default GradesEditingPanel
