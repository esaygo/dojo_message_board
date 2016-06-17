//specifies the schema to be loaded by mongoose
//it is required by mongoose.js, which is required by server.js, so no need to require this in server.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path = require('path');

var MessageSchema = new mongoose.Schema({
  name: String,
  message_text: String,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  created_at: {type: Date, default: Date.now}
});

var CommentSchema = new mongoose.Schema({
  _message: {type: Schema.Types.ObjectId, ref: 'Message'},
  name: String,
  comment_text: String,
  created_at: {type: Date, default: Date.now}
});

var Message = mongoose.model('Message', MessageSchema);// setting this Schema in our Models
var Comment = mongoose.model('Comment', CommentSchema);

MessageSchema.path('name').required(true, 'Name cannot be blank');
MessageSchema.path('message_text').required(true, 'Message cannot be blank');
