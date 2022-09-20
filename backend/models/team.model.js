const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema ({
    name: { type:String, required: true },
    description: { type:String, required: true },
    points: { type:Number, required: true },
    date: { type:Date, required: true },
}, {
  timestamps:true,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;