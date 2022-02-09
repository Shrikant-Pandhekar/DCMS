const express = require('express');
const router = express.Router();
const { createQuestion, getAllQuestions , getQuestion, getUnansweredQuestions} = require('../controllers/question')
const {getUserById} = require('../controllers/user');

router.param('userId', getUserById);

router.post('/question/create', createQuestion);
router.get('/question/all', getAllQuestions);
router.get('/question/unanswered', getUnansweredQuestions);

router.get('/question/:userId', getQuestion);


module.exports = router;