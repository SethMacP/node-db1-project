const router = require('express').Router();
const model = require('./accounts-model');
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
	// DO YOUR MAGIC
	try{
		const accounts = await model.getAll();
		res.status(200).json(accounts);
	}catch(err){
		next(err)
	}
})

router.get('/:id', checkAccountId(), async (req, res, next) => {
	try{
		const account = await model.getById(req.params.id)
		// console.log(account)	
		res.status(200).json(account)
		
	}catch(err){
		next(err);	
		}
	});

router.post('/', checkAccountPayload(),  checkAccountNameUnique(),async(req, res, next) => {
	// DO YOUR MAGIC
	// console.log('router:   ', req.body);
	try{
		const post = await model.create(req.body);
		// console.log('try')
		res.status(201).json(post)
	}catch(err){
		// console.log('err')
		next(err)
	}
})

router.put('/:id',checkAccountPayload(), checkAccountId(),  async(req, res, next) => {
	// DO YOUR MAGIC
	try{
		const updateAccount = await model.updateById(req.params.id, req.body)
		res.status(200).json(updateAccount)
	}catch(err){
		next(err);
	}



});

router.delete('/:id', checkAccountId(), async (req, res, next) => {
	// DO YOUR MAGIC
	try{
		const deletePost = await model.deleteById(req.params.id)
		res.status(200).json({message: "Deleted"})
	}catch(err){
		next(err);
	}
	
})

router.use((err, req, res, next) => { // eslint-disable-line
	// CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
	res.status(500).json({
		message: 'something went wrong inside the accounts router',
		errMessage: err.message,
	})
})

module.exports = router;
