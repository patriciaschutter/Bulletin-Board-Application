const pg = require('pg')
const Client = pg.Client
require ('dotenv').load();

var client ={}

// function to make connection to the right database. Database specified in app.js
function initialize(obj){
	client = new Client(obj)
	client.connect((err) =>{
		if (err) {
    	console.error('connection error', err.stack)
  	} else {
    	console.log('connected')
  	}
	})
}



//function to see all info in specific table
function findAll(table, cb){
	client.query(`SELECT * FROM ${table};`)
	.then(result => {
		cb(result.rows)
	})
	.catch((error) => {
		console.log("error function findAll: ", error);
	})
}

// function select everything where username matches with the input
function findWhere(table, userName, cb){
	client.query(`SELECT * FROM ${table} WHERE username = '${userName}';`)
		.then(result => {
			cb(result.rows)
		})
		.catch((error) => {
			console.log("error function findWhere: ", error);
		})
}

// function to find a specific part of a table 
function findById(table, id, cb){
	client.query(`SELECT * FROM ${table} WHERE id = ${id}`)
	.then((result)=>{
		cb(result.rows)
	})
	.catch((error) => {
		console.log("error function findById: ", error);
	})
}

// function to insert username in users table
function insertUser(table, value, cb){
	client.query(`INSERT INTO ${table} (username) values ('${value}');`)
	.then(result => {
			cb(result.rows)
		})
		.catch((error) => {
			console.log("error function insertUser: ", error);
		})
}

// function to insert (Messages) into bulletinboard database
function insertMessages(table, table2, title, message, username, cb){
	
	client.query(`INSERT INTO ${table} (title, body, user_id) SELECT '${title}', '${message}', ${table2}.id FROM ${table2} WHERE ${table2}.username = '${username}';`)
	.then((result) => {
			cb(result.rows)
		})
	.catch((error) => {
		console.log("error at function insertMessages: ", error);
	})
}

// function to select all messages from specific user
function selectFrom(table1, table2, userSearch, cb){
	client.query(`SELECT * FROM ${table1} WHERE user_id = (SELECT (id) FROM ${table2} WHERE username = '${userSearch}');`)
	.then((result) => {
			cb(result.rows)
	})
	.catch((error) => {
		console.log("error at function insertMessages: ", error);
	})
}



// exporting the function to (in this case) app.js
module.exports = {
	initialize: initialize,
	findAll: findAll,
	findWhere: findWhere,
	findById: findById,
	insertUser: insertUser,
	insertMessages: insertMessages,
	selectFrom: selectFrom
}


