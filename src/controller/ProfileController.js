const jwt = require('jsonwebtoken');
const ProfileModel = require('../models/ProfileModel');

// User Registration
exports.CreateProfile = (req, res) => {
  const reqBody = req.body;

  ProfileModel.create(reqBody, (error, data) => {
    if (!error) {
      res.status(200).json({ Status: 'Profile Created Success', data: data });
    } else {
      res.status(200).json({ Status: 'Profile Creation Fail', data: error });
    }
  });
}

// User Login
exports.UserLogin = (req, res) => {
  const UserName = req.body['UserName'];
  const Password = req.body['Password'];

  ProfileModel.find({ UserName: UserName, Password: Password }, (error, data) => {
    if (error) {
      res.status(400).json({ status: 'Fail', data: error });
    } else {
      if (data.length > 0) {
        // JWT Auth Token

        const authToken = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: data[0]
        }, "SecretKey12345");

        res.status(200).json({ status: 'Success', authToken: authToken, data: data });
      } else {
        res.status(401).json({ status: 'Unauthorized' });
      }
    }
  })

}

// Select Profile
exports.SelectProfile = (req, res) => {
  const UserName = req.headers['UserName'];

  ProfileModel.find({ UserName: UserName }, { Password: 0 }, (error, data) => {
    if (!error) {
      res.status(200).json({ status: 'Success', data: data });
    } else {
      res.status(400).json({ status: 'Unauthorized', data: error });
    }
  })

}

// Update Profile
exports.UpdateProfile = (req, res) => {
  const UserName = req.headers['UserName'];
  const reqBody = req.body;

  ProfileModel.updateOne({ UserName: UserName }, reqBody, { upsert: true }, (error, data) => {
    if (!error) {
      res.status(200).json({ status: 'Success', data: data });
    } else {
      res.status(400).json({ status: 'Fail', data: error });
    }
  });
}