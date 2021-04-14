var express = require('express');
var router = express.Router();
var userController= require('../controllers/fetchController');
router.get('/fetchdata',userController.fetchData);
module.exports = router;

// HTTP Methods
//
// GET -> Get an existing record
// POST -> Create a new record -> expecting somthing in the body
// PUT -> Update an existing record
// PATCH