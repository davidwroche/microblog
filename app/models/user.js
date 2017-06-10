/**
 * Created by Tosh on 10/10/2016.
 */
'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  picture: { data: Buffer, contentType: String },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
