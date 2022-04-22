const ProfileModel = require('../models/ProfileModel');

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