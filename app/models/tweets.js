/**
 * Created by Tosh on 10/10/2016.
 */
const mongoose = require('mongoose');

const tweetsSchema = mongoose.Schema({
  message: String,
  picture: { data: Buffer, contentType: String },
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Tweets = mongoose.model('Tweets', tweetsSchema);
module.exports = Tweets;
