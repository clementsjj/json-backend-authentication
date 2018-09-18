const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  signUp: params => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: params.email })
        .then(user => {
          console.log(user);

          if (user) {
            let error = {};
            error.message = 'Email Already Exists';
            error.status = 400;
            reject(error);
            console.log('User Alread Exists');
          } else {
            const newUser = new User({
              username: params.username,
              email: params.email,
              password: params.password
            });
            console.log('User Created');
            bcrypt.genSalt(10, (err, salt) => {
              if (err) {
                reject(err);
              }
              bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
                if (err) {
                  reject(err);
                } else {
                  newUser.password = hashedPassword;
                  newUser
                    .save()
                    .then(user => resolve(user))
                    .catch(err => reject(err));
                }
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
