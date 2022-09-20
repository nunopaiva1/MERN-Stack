const router = require('express').Router();
let User = require('../models/user.model');

//Primeira rota que lida com o request GET do HTTP
router.route('/').get((req, res) => {
    //Comando do mongoose que vai procurar todos os users na BD
    //Faz o retorno em formato JSON

    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Lida com o comando POST do HTTP
router.route('/add').post((req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({username, password});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Eliminar user por ID
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Autenticação LOGIN
router.route('/check').post((req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    console.log("O NOME QUE CHEGA É: " + username + " e a password é: " + password)

    User.findOne({username: username}, function(err, user){
        if(err) {
          console.log(err);
        }
        var message;
        
        if(user) {

            const isMatch = user.isValidPassword(password);

            if(!isMatch){
                message = "nice pass lol";
                console.log(message);
            }
            else {
                console.log(user)
                message = "existe";
                console.log(message)
            }
        } else {
            console.log(user)
            message= "naoExiste";
            console.log(message)
        }
        res.json({message: message});
    });
});

module.exports = router;