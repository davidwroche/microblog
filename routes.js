/**
 * Created by Tosh on 10/10/2016.
 */
const Accounts = require('./app/controllers/accounts');
const Assets = require('./app/controllers/assets');
const Tweets = require('./app/controllers/tweets');

module.exports = [

  { method: 'GET', path: '/', config: Accounts.main },
  { method: 'GET', path: '/signup', config: Accounts.signup },
  { method: 'GET', path: '/login', config: Accounts.login },
  { method: 'POST', path: '/login', config: Accounts.authenticate },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/register', config: Accounts.register },
  { method: 'GET', path: '/settings', config: Accounts.viewSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },
  { method: 'POST', path: '/userSignup', config: Accounts.newUser },

  { method: 'POST', path: '/uploadpicture', config: Accounts.upload },
  { method: 'GET', path: '/getpicture', config: Accounts.getpicture },
  { method: 'GET', path: '/getadminuser/{id}', config: Accounts.getadminusers },

  { method: 'GET', path: '/home', config: Tweets.home },
  { method: 'GET', path: '/adminarea', config: Tweets.adminarea },
  { method: 'POST', path: '/tweet', config: Tweets.message },
  { method: 'GET', path: '/mytweets', config: Tweets.mytweets },
  { method: 'GET', path: '/globaltweets', config: Tweets.globaltweet },
  { method: 'POST', path: '/del', config: Tweets.deletes },
  { method: 'POST', path: '/delall', config: Tweets.deletesall },
  { method: 'GET', path: '/Users', config: Tweets.report },
  { method: 'POST', path: '/removeuser', config: Tweets.removeUser },
  { method: 'GET', path: '/Tweets', config: Tweets.messages },
  { method: 'POST', path: '/deletetweets', config: Tweets.removeTweets },
  { method: 'GET', path: '/users', config: Tweets.allusers },
  { method: 'POST', path: '/thistimeline', config: Tweets.getTimeline },

  { method: 'GET', path: '/getpic/{id}', config: Tweets.getpicturetweet },
  { method: 'GET', path: '/getuserpic/{id}', config: Tweets.gettweetuserpic },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];
