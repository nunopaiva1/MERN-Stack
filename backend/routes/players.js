const router = require('express').Router();
let Player = require('../models/player.model');

router.route('/').get((req, res) => {
    Player.find()
    .then(players => res.json(players))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Adicionar jogador!
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const position = req.body.position;
    const age = Number(req.body.age);
    const team = req.body.team;
    const nationality = req.body.nationality;

    const newPlayer = new Player({
        name,
        position,
        age,
        team,
        nationality,
    });

    newPlayer.save()
    .then(() => res.json('Player added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Encontrar jogador por ID
router.route('/:team').get((req, res) => {
    Player.find({team:req.params.team})
    .then(player => res.json(player))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Eliminar jogador por ID
router.route('/:id').delete((req, res) => {
    Player.findByIdAndDelete(req.params.id)
    .then(() => res.json('Player deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Edita jogador por ID
router.route('/update/:id').post((req, res) => {
    Player.findById(req.params.id)
    .then(player => {
        player.name = req.body.name;
        player.position = req.body.position;
        player.age = Number(req.body.age);
        player.team = req.body.team;
        player.nationality = req.body.nationality;

        player.save()
        .then(() => res.json("Player updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })

    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;