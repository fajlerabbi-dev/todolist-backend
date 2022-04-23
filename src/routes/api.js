const express = require('express');
const { CreateProfile, UserLogin, SelectProfile, UpdateProfile } = require('../controller/ProfileController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');
const router = express.Router();


// API ROUTES
router.post('/CreateProfile', CreateProfile)
router.post('/UserLogin', UserLogin);
router.get('/SelectProfile', AuthVerifyMiddleware, SelectProfile);
router.post('/UpdateProfile', AuthVerifyMiddleware, UpdateProfile);


module.exports = router;