const router = require('express').Router();
const model = require('./accounts-model');
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware');
const { resource } = require('../server');

router.get('/', async (req, res, next) => {
	// DO YOUR MAGIC
	model.getAll()
		.then(accounts=>{
			res.status(200).json(accounts)
		})
		.catch(()=>{
			res.status(500).json({message:"Server Error"})
		})
})

router.get('/:id',  (req, res, next) => {
	model.getById(req.params.id)
		.then(account=>{
			res.status(200).json(account)
		})
		.catch(()=>{
			res.status(500).json({message:"Server Error"})
		})
})

router.post('/', (req, res, next) => {
	// DO YOUR MAGIC
	console.log(req.body);
	model.create(req.body)
		.then(post=>{
			res.status(200).json(post)
		})
		.catch(()=>{
			res.status(500).json({message: "Server Error"})
		})
})

router.put('/:id', (req, res, next) => {
	// DO YOUR MAGIC
	model.updateById(req.params.id, req.body)
		.then(updatedPost => {
			res.status(200).json(updatedPost)
		})
		.catch(()=>{
			res.status(500).json({message:"Server Error"})
		})
});

router.delete('/:id', (req, res, next) => {
	// DO YOUR MAGIC
	model.deleteById(req.params.id)
		.then(()=>{
			res.status(200).json({message:"Deleted"})
		})
		.catch(()=>{
			res.status(500).json({message:"Server Error"})
		})
})

router.use((err, req, res, next) => { // eslint-disable-line
	// CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
	res.status(500).json({
		message: 'something went wrong inside the accounts router',
		errMessage: err.message,
	})
})

module.exports = router;
