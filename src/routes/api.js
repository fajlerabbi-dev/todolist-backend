const express = require('express');
const { CreateProfile, UserLogin, SelectProfile, UpdateProfile } = require('../controller/ProfileController');
const { CreateTodo, SelectTodo, UpdateTodo, UpdateStatusTodo, RemoveTodo, SelectTodoByStatus, SelectTodoByDate } = require('../controller/TodoListController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');
const router = express.Router();


//PROFILE API ROUTES
router.post('/CreateProfile', CreateProfile)
router.post('/UserLogin', UserLogin);
router.get('/SelectProfile', AuthVerifyMiddleware, SelectProfile);
router.post('/UpdateProfile', AuthVerifyMiddleware, UpdateProfile);

// TODO API ROUTES
router.post('/CreateTodo', AuthVerifyMiddleware, CreateTodo);
router.get('/SelectTodo', AuthVerifyMiddleware, SelectTodo);
router.post('/UpdateTodo', AuthVerifyMiddleware, UpdateTodo);
router.post('/UpdateStatusTodo', AuthVerifyMiddleware, UpdateStatusTodo);
router.post('/RemoveTodo', AuthVerifyMiddleware, RemoveTodo);
router.post('/SelectTodoByStatus', AuthVerifyMiddleware, SelectTodoByStatus);
router.post('/SelectTodoByDate', AuthVerifyMiddleware, SelectTodoByDate);






module.exports = router;