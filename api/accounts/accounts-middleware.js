//Readme Dump:
// #### Write Middleware

// - Write the following middlewares inside `api/accounts/accounts-middleware.js`:

//   - `checkAccountPayload` returns a status 400 with if `req.body` is invalid:

//     - If either name or budget are undefined, return `{ message: "name and budget are required" }`
//     - If name is not a string, return `{ message: "name of account must be a string" }`
//     - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }`
//     - If budget is not a number, return `{ message: "budget of account must be a number" }`
//     - If budget is a negative number or over one million, return  `
//{ message: "budget of account is too large or too small" }`

//   - `checkAccountId` returns a status 404 with a 
//          `{ message: "account not found" }` 
//      if `req.params.id` does not exist in the database

//   - `checkAccountNameUnique` returns a status 400 with a `{ message: "that name is taken" }` if the _trimmed_ `req.body.name` already exists in the database
const dbConfig = require('../../data/db-config');
const model = require('./accounts-model');


exports.checkAccountPayload = () => (req, res, next) => {
  // DO YOUR MAGIC
  let name = req.body.name
  let budget = req.body.budget

  if(!req.body.name || !req.body.budget){
    return res.status(400).json({message:"Name & Budget are required"})
  }
  if(typeof req.body.name !== "string"){
    return res.status(400).json({message:"Name must be a string"})
  } 
  if(req.body.name.length < 3 || req.body.name.length > 100){
    return res.status(400).json({message:"Name of account must be between 3-100 characters."})
  }
  if(typeof budget !== "number"){
    return res.status(400).json({message:"budget of account must be a number" })
  }
  if(budget < 0 || budget > 1000000){
    return res.status(400).json({message: "budget of account doesnt fit within parameters (0-1,000,000)"})
  }
  
  next();
}

exports.checkAccountNameUnique = ()=> async (req, res, next) => {
  // DO YOUR MAGIC
    const fullList = await model.getAll();
    const verification = fullList.filter(account => account.name === req.body.name);
    console.log('verification: ' ,verification)
    console.log('req', req.body.name)
    if (verification[0].name === req.body.name){
      return(res.status(400).json({message:"Account name is already taken"}))
    }else{
      next();
    }
}

exports.checkAccountId = () => async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const account = await model.getById(req.params.id);
     if(account){
        console.log(account)
        next();
      }else{
        res.status(404).json({message:"ID Does not exist"})
      }
  }catch(err){
    next(err);
  }
  }
