const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');
const mailChecker = require('mailchecker');
const User = require('../models/User');

const randomBytesAsync = promisify(crypto.randomBytes);

const DonatedFood = require('../models/foods_available'); 
const FoodRequested = require('../models/foods_requested'); 

//get all foods
/**
 * GET /books
 * List all books.
 */
exports.getFoodAvailable = (req, res) => {
  DonatedFood.find((err, docs) => {
    res.render('food/food_available', { 
      foods: docs,
      title: 'All foods in dat abase' 
    });
  });
};

exports.getDonate = (req, res) => { 
    res.render('food/donate', { 
      title: 'Donation Page',
      variables: ['1','2','3']
    }); 
};

exports.postDonate = (req, res,next) => { 
  var category = req.param('category', null);
  var name = req.param('name', null);
  var date = req.param('date', null);
  
  var entered_food = new FoodAvailable({ name: name, date: date, category: category });

  // Save the new model instance, passing a callback
  entered_food.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });

  req.flash('success', { msg: 'Success! Added.' });
  
  res.render('food/donate', { 
    title: 'Donation Page' 
  }); 
};

exports.getRequest = (req, res) => { 
    res.render('food/request', { 
      title: 'Food Required Page' 
    }); 
};

exports.postRequest = (req, res,next) => { 
  var category = req.param('category', null);
  var name = req.param('name', null);
  var date = req.param('date', null);
  
  var entered_food_category = new FoodRequested({ name: name, date: date, category: category });

  // Save the new model instance, passing a callback
  entered_food_category.save(function (err) {
    if (err) return handleError(err);
    
    // saved!
  });
  
  req.flash('success', { msg: 'Success! Added.' });
  
  res.render('food/donate', { 
    title: 'Donation Page' 
  }); 
};


/**
 * GET /getUserFoods
 * Login page.
 */
exports.getUserFoods = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: 'Login'
  });
};

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/login');
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};
