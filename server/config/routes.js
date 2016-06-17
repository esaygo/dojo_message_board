//specifies which routes will be handled by which controllers

var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');
var messages = require('../controllers/messages.js');

module.exports = function(app) {

  app.get('/', function (req,res) {
    messages.show(req, res);
    // res.render('index');
  });

  app.post('/post_message', function(req,res) {
    //console.log("post data: ", req);
    messages.create_message(req,res);
  });

  app.post('/post_comment/:id', function(req,res) {
    //console.log("post data: ", req);
    messages.create_comment(req,res);
  });

}
