const mongoose = require('mongoose');
const moment = require('moment');
const now = moment();

const UserSchema = new Mongoose.Schema({
  email: { type: String, default: '' },
  username: { type: tyring, default: '' },
  password: { type: String, default: '' },
  timestamp: {
    type: String,
    default: now.format('dddd, MMMM Do YYYY, h:mm:ss a')
  }
});

module.exports = mongoose.model('users', UserSchema);
