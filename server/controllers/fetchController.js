var fetchModel= require('../models/MajorCourses.js');
module.exports={
 
    fetchData:function(req, res){
      
      fetchModel.fetchData(function(data){
          res.json({courseData:data});
      })
    }
}