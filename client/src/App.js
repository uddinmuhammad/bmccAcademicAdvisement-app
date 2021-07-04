import React from 'react'
import {Route} from 'react-router-dom'
import NavBar from './components/navbar.jsx'
import Resources from './components/resources.jsx'

import CoursesCurrent from './components/CoursesCurrent.jsx'
import CoursesNextSemester from './components/CoursesNextSemester.jsx'
import CoursesRequired from './components/CoursesRequired.jsx'
import CoursesTaken from './components/CoursesTaken.jsx';


function App() {
  return (
    <div className="App">
        <NavBar/>
        <Resources/>

        <div className="content">
          <Route path="/courses/current" component={CoursesCurrent} />
          <Route path="/courses/nextsemester" component={CoursesNextSemester} />
          <Route path="/courses/nextsemester" component={CoursesRequired} />
          <Route path="/courses/taken" component={CoursesTaken} />
          {/* <Route path="/" component={Resources} /> */}
        </div>
        
    </div>
  );
}

export default App;
