const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  signUp: params => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: params.email })
        .then(user => {
          console.log(user);

          if (user !== null) {
            //we do have that user
            const userUsername = user.username;

            User.findOne({ username: userUsername })
              .then(user => {
                if (user) {
                  let errors = {};
                  errors.message = 'Email already exists';
                  errors.status = 400;
                  return reject(errors);
                } else {
                  const newUser = new User({
                    username: params.username,
                    email: params.email,
                    password: params.password
                  });

                  bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(
                      newUser.password,
                      salt,
                      (err, hashedPassword) => {
                        if (err) {
                          reject(err);
                        } else {
                          newUser.password = hashedPassword;
                          newUser
                            .save()
                            .then(user => resolve(user))
                            .catch(err => reject(err));
                        }
                      }
                    );
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
