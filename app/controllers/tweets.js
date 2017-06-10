/**
 * Created by Tosh on 10/10/2016.
 */
'use strict';
const Tweets = require('../models/tweets');
const User = require('../models/user');

exports.home = {

  handler: function (request, reply) {

    let userEmail = request.auth.credentials.loggedInUser;

    User.findOne({ email: userEmail }).then(foundUser => {
      reply.view('home', { title: 'Welcome to MyTweet Home', user: foundUser });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.message = {

  payload: {
    parse: true,
    output: 'data',
  },

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(user => {
      let data = request.payload;
      console.log(data);
      let data1 = request.payload.picture;
      if (Object.getOwnPropertyNames(data1).length === 0) {
        const Tweet = new Tweets(data);
        Tweet.message = data.message;
        Tweet.poster = user._id;
        return Tweet.save();
        console.log('first');
      } else {
        const Tweet = new Tweets(data);
        Tweet.picture.data = data1;
        Tweet.message = data.message;
        Tweet.poster = user._id;
        return Tweet.save();
        console.log('second');
      }
    }).then(newTweet => {
      reply.redirect('/home');
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.mytweets = {

  handler: function (request, reply) {

    let userId = request.auth.credentials.loggedInUser;

    User.findOne({ email: userId }).then(foundUser => {
      const thisposter = foundUser._id;
      Tweets.find({ poster: thisposter }).then(foundMessage => {
        reply.view('mytweets', { title: 'Users Tweets', tweets: foundMessage });
      }).catch(err => {
        reply.redirect('/home');
      });
    }).catch(err => {
      reply.redirect('/home');
    });
  },

};

//Global timeline of tweets
exports.globaltweet = {

  handler: function (request, reply) {
    Tweets.find({}).populate('poster').then(allTweets => {
      reply.view('globaltweet', {
        title: 'Global Timeline',
        Tweet: allTweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//Delete one or many User tweets
exports.deletes = {

  handler: function (request, reply) {
    let userId = request.auth.credentials.loggedInUser;
    let data = request.payload;

    if (!Array.isArray(data.mes)) {   //We know it a single object
      Tweets.remove({ _id: data.mes }).then(
          reply.redirect('mytweets')
      );
    };

    User.findOne({ email: userId }).then(foundUser => {
      const thisposter = foundUser._id;
      Tweets.find({ poster: thisposter }).then(foundTweet => {
        if (Array.isArray(data.mes)) {
          for (let a = 0; a < foundTweet.length; a++) {
            for (let b = 0; b < data.mes.length; b++) {
              if (foundTweet[a]._id == data.mes[b]) {
                Tweets.remove({ _id: data.mes[b] }).then(deltweets => {
                }).catch(console.log('inside'));
              }
            }
          }

          reply.redirect('mytweets');
        }
      }).then(delTweets => {
        reply.redirect('home');
      }).catch(err => {
        reply.redirect('home');
      });
    });
  },
};

//Delete all Users Tweets
exports.deletesall = {

  handler: function (request, reply) {
    let userId = request.auth.credentials.loggedInUser;
    User.findOne({ email: userId }).then(foundUser => {
      const thisposter = foundUser._id;
      Tweets.find({ poster: thisposter }).then(foundTweet => {
        Tweets.remove({ poster: thisposter }).then(
            reply.redirect('mytweets')
        );
      }).catch(err => {
        reply.redirect('home');
      });

    }).catch(err => {
      reply.redirect('home');
    });
  },
};

exports.adminarea = {
  handler: function (request, reply) {
    User.find({}).then(userAmount => {
      Tweets.find({}).then(tweetAmount => {

        reply.view('adminarea', { title: 'Admin Area',
          usercount: userAmount.length,
          tweetcount: tweetAmount.length,
        });
      });
    });
  },
};

exports.removeUser = {

  handler: function (request, reply) {
    let userId = request.auth.credentials.loggedInUser;
    let data = request.payload;

    //Remove User and in turn remove their tweets
    if (!Array.isArray(data.usr)) {   //We know it a single object
      const thisposter = data.usr;
      User.remove({ _id: data.usr }).then(
      Tweets.find({ poster: thisposter }).then(
        Tweets.remove({ poster: thisposter }).then(
            reply.redirect('adminarea')
      )
    )
      );
    }

    User.find({}).then(foundUser => {
      if (Array.isArray(data.usr)) {
        for (let c = 0; c < foundUser.length; c++) {
          for (let b = 0; b < data.usr.length; b++) {
            console.log(foundUser.length);
            if (foundUser[c]._id == data.usr[b]) {
              const thisuser = foundUser[c]._id;
              User.remove({ _id: data.usr[b] }).then(
                  Tweets.remove({ poster: thisuser }).then(
                  )
              ).catch(console.log('inside'));
            }
          }
        }

        reply.redirect('Users');
      }
    }).catch(err => {
      reply.redirect('adminarea');
    });
  },
};

exports.report = {

  handler: function (request, reply) {
    User.find({}).exec().then(allUsers => {
      reply.view('removeuser', {
        title: 'All Users in DB',
        User: allUsers,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.messages = {

  handler: function (request, reply) {
      Tweets.find({}).populate('poster').then(allTweets => {
        reply.view('adminremovetweets', {
          title: 'All Tweets in DB',
          Tweet: allTweets,
        });
      }).catch(err => {
        reply.redirect('/');
      });
    },

};

exports.removeTweets = {

  handler: function (request, reply) {
    //let userId = request.auth.credentials.loggedInUser;
    let data = request.payload;

    if (!Array.isArray(data.twe)) {   //We know it a single object
      Tweets.remove({ _id: data.twe }).then(
          reply.redirect('Tweets')
      );
    };

    Tweets.find({}).then(foundTweet => {
      if (Array.isArray(data.twe)) {
        for (let c = 0; c < foundTweet.length; c++) {
          for (let b = 0; b < data.twe.length; b++) {
            console.log(foundTweet.length);
            if (foundTweet[c]._id == data.twe[b]) {
              Tweets.remove({ _id: data.twe[b] }).then(
              ).catch(console.log('inside'));
            }
          }
        }

        reply.redirect('Tweets');
      }
    }).catch(err => {
      reply.redirect('adminarea');
    });
  },
};

exports.allusers = {

  handler: function (request, reply) {
    User.find({}).exec().then(allUsers => {
      reply.view('timeline', {
        title: 'All Users in DB',
        User: allUsers,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

//A single users timeline
exports.getTimeline = {
  handler: function (request, reply) {
    let data = request.payload;
    console.log(data);
    User.findOne({ _id: data.user }).then(foundUser => {
      const thisposter = foundUser._id;
      console.log(thisposter);
      Tweets.find({ poster: thisposter }).then(foundMessage => {
        User.find({}).then(allusers => {
          reply.view('timeline', { title: 'Users Tweets', tweets: foundMessage, user: foundUser,
            User: allusers, });
        });
      }).catch(err => {
        reply.redirect('/home');
      });
    }).catch(err => {
      reply.redirect('/home');
    });

  },

};

exports.getpicturetweet = {

  handler: function (request, reply) {
    Tweets.findOne({ _id: request.params.id }).then(tweet => {
      reply(tweet.picture.data).type('image');
    });
  },
};

exports.gettweetuserpic = {

  handler: function (request, reply) {
    Tweets.findOne({ _id: request.params.id }).then(tweet => {
      User.findOne({ _id: tweet.poster }).then(foundUser => {
        reply(foundUser.picture.data).type('image');
      });
    });
  },
};

