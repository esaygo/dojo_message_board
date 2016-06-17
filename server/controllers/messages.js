//controls all the server-side logic and is called upon by the routes
//interacts with preloaded models
//sends response to client

var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

module.exports = {
  create_message: function(req, res) {
    console.log("post data", req.body);
    var message = new Message({
                    name: req.body.name,
                    message_text: req.body.message
                });
    message.save(function(err) {
      if(err) {
        console.log(err);
        console.log('something went wrong');
        res.render('index', {title: 'you have errors!', errors: message.errors});
      } else {
        console.log('successfully added a message!');
        res.redirect('/');
      }
    });
   },

   create_comment: function(req, res) {
     //console.log("post comment data", req.body, req.params.id);
     Message.findOne({_id: req.params.id}, function(err, message) {
       var comment = new Comment(req.body);
       comment._message = req.params.id;
       comment.save(function(err) {
         message.comments.push(comment);
       message.save(function(err) {
         if(err) {
           console.log("Error");
         } else {
           console.log("comment was saved");
           res.redirect('/');
         }
       });
       });
     });
    },

  show: function(req, res) {
        Message.find({})
        .populate('comments')
        .exec(function(err, messages) {

          if(err) {
            console.log("error in find: ", err);
            res.render('index', {message: "there was an error"});
          } else {
            console.log("messages", messages);
            res.render('index', {messages: messages});
          }
        });
  }


}
