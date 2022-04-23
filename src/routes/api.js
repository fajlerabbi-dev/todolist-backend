const express = require('express');
const { CreateProfile, UserLogin, SelectProfile, UpdateProfile } = require('../controller/ProfileController');
const { CreateTodo } = require('../controller/TodoListController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');
const router = express.Router();


//PROFILE API ROUTES
router.post('/CreateProfile', CreateProfile)
router.post('/UserLogin', UserLogin);
router.get('/SelectProfile', AuthVerifyMiddleware, SelectProfile);
router.post('/UpdateProfile', AuthVerifyMiddleware, UpdateProfile);

// TODO API ROUTES
router.post('/CreateTodo', AuthVerifyMiddleware, CreateTodo);






module.exports = router;