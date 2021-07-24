const express = require('express');
const {CoursesRequired} = require('../services/CoursesRequiredService');


const CoursesRequiredRouter = express.Router();

CoursesRequiredRouter.get('/coursesRequired', CoursesRequired);

module.exports = CoursesRequiredRouter;



/**Data Populating Code**/
// const mongoose = require('mongoose');
// const toId = mongoose.Types.ObjectId;
// const addPreReqRoute = express.Router();
// const addCoReqRoute = express.Router();
// individualAndSocietyCoursesRouter.get('/individualAndSocietyCourses', individualAndSocietyCourses);

// addPreReqRoute.get("/addPreReq/:course/:preReq", async (req, res) => {
//   req.params.preReq = toId(req.params.preReq)
//   const course = await Courses.findById(req.params.course)
//   course.preReq.push(req.params.preReq) //req.params.prereq
//   course.save();

//   res.json(course);
// })

// addCoReqRoute.get("/add/:course/:coReq", async (req, res) => {
//   req.params.coReq = toId(req.params.coReq)
//   const course = await Courses.findById(req.params.course)
//   course.coReq.push(req.params.coReq) //req.params.prereq
//   course.save();

//   res.json(course);
// });




// export default coursesRequiredRouter;
// module.exports = addPreReqRoute;
// module.exports = StudentCoursesRequiredRouter