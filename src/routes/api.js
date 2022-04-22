const express = require('express');
const { CreateProfile } = require('../controller/ProfileController');
const router = express.Router();


// API ROUTES
router.post('/CreateProfile', CreateProfile)


module.exports = router;