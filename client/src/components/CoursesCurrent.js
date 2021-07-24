import React, { useState } from 'react'
import Class from './CourseCurrent'
import axios from 'axios'
import config from '../config/app_config.json'
import GradesEditingPanel from './GradesEditingPanel'

export default function CoursesCurrent() {
  const [courses, setCourses] = useState([
    {
      code: 'NONE',
      title: 'NO MORE COURSE IS Required',
      credits: 0,
      grade: 14,
    },
  ])

  var URI = config.base_url + config.courses_current

  axios.get(URI).then((response) => {
    setCourses(response.data)
  })

  return (
    <div className="container">
      <Class courses={courses} />
      <GradesEditingPanel courses={courses} />
    </div>
  )
}
