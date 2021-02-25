//Readme Dump:
// #### Write Middleware

// - Write the following middlewares inside `api/accounts/accounts-middleware.js`:

//   - `checkAccountPayload` returns a status 400 with if `req.body` is invalid:

//     - If either name or budget are undefined, return `{ message: "name and budget are required" }`
//     - If name is not a string, return `{ message: "name of account must be a string" }`
//     - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }`
//     - If budget is not a number, return `{ message: "budget of account must be a number" }`
//     - If budget is a negative number or over one million, return  `{ message: "budget of account is too large or too small" }`

//   - `checkAccountId` returns a status 404 with a 
//          `{ message: "account not found" }` 
//      if `req.params.id` does not exist in the database

//   - `checkAccountNameUnique` returns a status 400 with a `{ message: "that name is taken" }` if the _trimmed_ `req.body.name` already exists in the database
const model = require('./accounts-model');


exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.name || !req.body.budget){
    return res.status(404).json({message:"Name & Budget are required"})
  }
  if(typeOf(req.body.name) != "string"){
    return res.status(404).json({message:"Name must be a string"})
  } 
  next();
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  model.getById(req.params.id)
    .then(account=>{
        req.account = account;
        next();
    })
    .catch(()=>{
        res.status(500).json({message:"Server Error"})
    })
}
