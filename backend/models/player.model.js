const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema ({
    name: { type:String, required: true },
    position: { type:String, required: true },
    age: { type:Number, required: true },
    team: { type:String, required: true },
    nationality: { type:String, required: true },
}, {
  timestamps:true,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;