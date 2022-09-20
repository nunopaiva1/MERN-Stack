const router = require('express').Router();
let Team = require('../models/team.model');

router.route('/').get((req, res) => {
    Team.find().sort({points: -1})
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Adicionar equipa!
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const points = Number(req.body.points);
    const date = Date.parse(req.body.date);

    const newTeam = new Team({
        name,
        description,
        points,
        date,
    });

    newTeam.save()
    .then(() => res.json('Team added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Encontrar equipa por ID
router.route('/:id').get((req, res) => {
    Team.findById(req.params.id)
    .then(team => res.json(team))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Eliminar equipa por ID
router.route('/:id').delete((req, res) => {
    Team.findByIdAndDelete(req.params.id)
    .then(() => res.json('Team deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Edita equipa por ID
router.route('/update/:id').post((req, res) => {
    Team.findById(req.params.id)
    .then(team => {
        team.name = req.body.name;
        team.description = req.body.description;
        team.points = Number(req.body.points);
        team.date = Date.parse(req.body.date);

        team.save()
        .then(() => res.json("Team updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })

    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;