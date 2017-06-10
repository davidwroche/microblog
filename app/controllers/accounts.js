/**
 * Created by Tosh on 10/10/2016.
 */
'use strict';

const User = require('../models/user');

exports.main = {
  auth: false,
  handler: function (request, reply) {
    reply.view('main', { title: 'Welcome to MicroBlog' });
  },

};

exports.signup = {
  auth: false,
  handler: function (request, reply) {
    reply.view('signup', { title: 'Sign up for MicroBlog' });
  },

};

exports.login = {
  auth: false,
  handler: function (request, reply) {
    reply.view('login', { title: 'Login to MicroBlog' });
  },

};

exports.authenticate = {
  auth: false,
  handler: function (request, reply) {
    const user = request.payload;
    User.findOne({ email: user.email }).then(foundUser => {
      if (foundUser && foundUser.password === user.password) {
        request.cookieAuth.set({
          loggedIn: true,
          loggedInUser: user.email,
        });
        reply.redirect('/home');
      } else if (user.email === 'admin@microblog.ie' && user.password === 'password') {
        request.cookieAuth.set({
          loggedIn: true,
          loggedInUser: user.email,
        });
        reply.redirect('/adminarea');
      } else {
        reply.redirect('/signup');
      }
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.register = {
  auth: false,
  handler: function (request, reply) {
    const user = new User(request.payload);
    if (user.email != 'admin@microblog.ie') {
      user.save().then(newUser => {
        reply.redirect('/login');
      }).catch(err => {
        reply.redirect('/');
      });
    }else {
      reply.redirect('/');
    }
  },

};

exports.logout = {
  auth: false,
  handler: function (request, reply) {
    request.cookieAuth.clear();
    reply.redirect('/');
  },

};

exports.viewSettings = {

  handler: function (request, reply) {

    let userEmail = request.auth.credentials.loggedInUser;

    User.findOne({ email: userEmail }).then(foundUser => {
      reply.view('settings', { title: 'Edit Account Settings', user: foundUser });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.updateSettings = {

  //auth: false,
  handler: function (request, reply) {
    const editedUser = request.payload;

    let loggedInUserEmail = request.auth.credentials.loggedInUser;
    //need to add someting in to stop user setting email as admin emailS
    User.findOne({ email: loggedInUserEmail }).then(user => {
      user.firstName = editedUser.firstName;
      user.lastName = editedUser.lastName;
      if (editedUser.email == 'admin@microblog.ie')
      {
        user.email = user.email;
      } else {
        user.email = editedUser.email;
      }

      user.password = editedUser.password;
      return user.save();
    }).then(user => {
      reply.view('settings', { title: 'Edit Account Settings', user: user });
    });
  },
};

exports.newUser = {
  auth: false,
  handler: function (request, reply) {
    const user = new User(request.payload);

    user.save().then(newUser => {
      reply.redirect('/Users');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};


exports.upload = {

  payload: {
    parse: true,
    output: 'data',
  },

  handler: function (request, reply) {
    const data = request.payload.picture;
    console.log(data);
    var loggedInUserEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: loggedInUserEmail }).then(user => {
      user.picture.data = data;
      console.log(user.picture.data);
      return user.save();
    }).then(user => {
      reply.view('settings', { title: 'Edit Account Settings', user: user });
    })
        .catch(err => {
          reply.redirect('/home');
        });

  },
};

exports.getpicture = {

  handler: function (request, reply) {
    var loggedInUserEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: loggedInUserEmail }).then(user => {

      reply(user.picture.data).type('image');
    });
  },
};

exports.getadminusers = {

  handler: function (request, reply) {
    User.findOne({ _id: request.params.id }).then(foundpic => {
      reply(foundpic.picture.data).type('image');
    });
  },
};


