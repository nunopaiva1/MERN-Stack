const router = require('express').Router();
let Forum = require('../models/forum.model');

router.route('/').get((req, res) => {
    Forum.find()
    .then(forums => res.json(forums))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const author = req.body.author;
    const title = req.body.title;
    const message = req.body.message;
    const date = Date.parse(req.body.date);

    const newForum = new Forum({
        author,
        title,
        message,
        date,
    });

    newForum.save()
    .then(() => res.json('Forum added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Forum.findById(req.params.id)
    .then(forum => res.json(forum))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Forum.findByIdAndDelete(req.params.id)
    .then(() => res.json('Forum deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Forum.findById(req.params.id)
    .then(forum => {
        forum.author = req.body.author;
        forum.title = req.body.title;
        forum.message = req.body.message;
        //forum.date = Date.parse(req.body.date);

        forum.save()
        .then(() => res.json("Forum updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })

    .catch(err => res.status(400).json('Error: ' + err));

});


module.exports = router;