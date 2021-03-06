const router = require('express').Router();
let Exercise = require('../models/exercise.model');

/*
**
* Get all  exercises
*/
router.route('/').get(( req, res) => {
	Exercise.find()
	.then(exercises => res.json(exercises))
	.catch(err => res.status(400).json('Error:' + err));
});


/*
**
* Add an xercise
*/

router.route('/add').post(( req, res) => {
	const username = req.body.username;
	const description = req.body.description;
	const repetitions = Number(req.body.repetitions);
	const date = Date.parse(req.body.date);

	const newExercise = new Exercise({username, description, repetitions, date});

	newExercise.save()
	.then(() => res.json('Session added!'))
	.catch(err => res.status(400).json('Error' + err))

});

/*
**
* Get an exercise
*/

router.route('/:id').get(( req, res) => {
	Exercise.findById(req.params.id)
	.then(exercise => res.json(exercise))
	.catch(err => res.status(400).json('Error:' + err));
});

/*
**
* Delete an exercise
*/

router.route('/:id').delete(( req, res) => {
	Exercise.findByIdAndDelete(req.params.id)
	.then(exercise => res.json('Session deleted!'))
	.catch(err => res.status(400).json('Error:' + err));
});

/*
**
* Update an exercise
*/

router.route('/update/:id').post(( req, res) => {
	Exercise.findById(req.params.id)
	.then(exercise => {
		exercise.username = req.body.username;
		exercise.description = req.body.description;
		exercise.repetitions = Number(req.body.repetitions);
		exercise.date = Date.parse(req.body.date);

		exercise.save()
		.then(() => res.json('Session updated!'))
		.catch(err => res.status(400).json('Error' + err));

	})
	.catch(err => res.status(400).json('Error:' + err));
});



module.exports = router;