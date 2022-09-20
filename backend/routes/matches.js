const router = require('express').Router();
let Match = require('../models/match.model');

router.route('/').get((req, res) => {
    Match.find()
    .then(matches => res.json(matches))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Adicionar encontro!
router.route('/add').post((req, res) => {
    const homeTeam = req.body.homeTeam;
    const date = Date.parse(req.body.date);
    const awayTeam = req.body.awayTeam;
    var homeScore = Number(req.body.homeScore);
    var awayScore = Number(req.body.awayScore);

    if(isNaN(parseFloat(awayScore)) || isNaN(parseFloat(homeScore))){
        homeScore = 0;
        awayScore = 0;
        console.log("casa: "+homeScore + "   " + "fora: " +awayScore);
    }


    const newMatch = new Match({
        homeTeam,
        date,
        awayTeam,
        homeScore,
        awayScore
    });

    newMatch.save()
    .then(() => res.json('Match created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Encontrar jogo por ID
router.route('/:id').get((req, res) => {
    Match.findById(req.params.id)
    .then(match => res.json(match))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Eliminar jogo por ID
router.route('/:id').delete((req, res) => {
    Match.findByIdAndDelete(req.params.id)
    .then(() => res.json('Match deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Edita jogo por ID
router.route('/update/:id').post((req, res) => {
    Match.findById(req.params.id)
    .then(match => {
        match.homeTeam = req.body.homeTeam;
        match.date = Date.parse(req.body.date);
        match.awayTeam = req.body.awayTeam;
        match.homeScore = Number(req.body.homeScore);
        match.awayScore = Number(req.body.awayScore);

        match.save()
        .then(() => res.json("Match updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })

    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;