const express = require('express');
const { CreateProfile, UserLogin } = require('../controller/ProfileController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');
const router = express.Router();


// API ROUTES
router.post('/CreateProfile', CreateProfile)
router.post('/UserLogin', UserLogin);
router.post('/SelectProfile', AuthVerifyMiddleware, UserLogin);


module.exports = router;