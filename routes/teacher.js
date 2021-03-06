const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/Teacher');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Teacher'});
});

router.get('/:id', TeacherController.get);
router.post('/:id', TeacherController.postRate);

module.exports = router;
