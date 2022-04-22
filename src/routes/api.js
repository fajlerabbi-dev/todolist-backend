const express = require('express');
const { CreateProfile, UserLogin } = require('../controller/ProfileController');
const router = express.Router();


// API ROUTES
router.post('/CreateProfile', CreateProfile)
router.post('/UserLogin', UserLogin);


module.exports = router;