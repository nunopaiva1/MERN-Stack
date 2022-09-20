const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const matchSchema = new Schema ({
    homeTeam: { type:String, required: true },
    date: { type:Date, required: true },
    awayTeam: { type:String, required: true },
    homeScore: { type:Number, default: 0},
    awayScore: { type:Number, default: 0}
}, {
  timestamps:true,
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;