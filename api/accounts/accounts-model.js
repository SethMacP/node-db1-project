const db = require("../../data/db-config");

const getAll = async ()=> {
  // DO YOUR MAGIC
	const data = await db
		.select("*")
		.from("Accounts")
	return data;
    
}

const getById = async (id) => {
  // DO YOUR MAGIC
  const data = await db("Accounts")
  	.select("*")
	.where("id", id)
	.limit(1)
	return data
}

const create = async (account) => {
  // DO YOUR MAGIC
  console.log('account', account)
	const newPost = await db
			.insert({
				name: account.name ,
				budget: account.budget, 
				})
			.into("Accounts")
		return getById(newPost)	
		
		
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  console.log("id: ", id);
  console.log("account", account)
	const updateContent = await db 
		.update({
			name: account.name,
			budget: account.budget
		})
		.into("Accounts")
		.where("id" , id)
	const updatedAccount = await db
		.select("*")
		.from("accounts")
		.where("id", id)
		.limit(1)
	return updatedAccount;
}

const deleteById = async id => {
  // DO YOUR MAGIC
	const deleteResource = await db("Accounts")
		.where("id", id)
		.del()
	return deleteResource
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
