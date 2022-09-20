const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forumSchema = new Schema ({
    author: { type:String, required: true },
    title: { type:String, required: true },
    message: { type:String, required: true },
    date: { type:Date, required: true },
}, {
  timestamps:true,
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;