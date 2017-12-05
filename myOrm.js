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



// exporting the function to (in this case) app.js
module.exports = {
	initialize: initialize,
	findAll: findAll,
	findWhere: findWhere,
	findById: findById,
	insertUser: insertUser,
	insertMessages: insertMessages,
}





// myOrm.findAll("users", function(res){
// 	    console.log("Result findAll: ", res)
// })	



// myOrm.findById("messages", 27, function(res){
//     console.log("Result findById: ", res)
// })





// app.post('/inputMessages', function(req, res){
// 	var inputUser = req.body.username
// 	var inputTitle = req.body.title
// 	var inputMessage = req.body.message

// 	myOrm.findWhere('users', inputUser, function(result){
// 		console.log("length: ", result.length)
// 		if(result.length !== 0){ // if user exists
// 			myOrm.insertMessages('messages', 'users', inputTitle, inputMessage, inputUser, function(result){
// 				console.log("inserted into messages1")
// 			})
// 		}
// 		else if (result.length < 0){ // if it's not existing, username should be added/inserted in users table
// 			myOrm.insertUser('users', inputUser, function(result){
// 			})
// 			myOrm.insertMessages('messages', 'users', inputTitle, inputMessage, inputUser, function(result){
// 				console.log("inserted into messages1")
// 			})
// 		}
// 	})
	
// 	res.render('thanks')// Thank you message for 2 sec then back to form.
// })


// app.post('/inputMessages', function(req, res){
// 	var inputUser = req.body.username
// 	var inputTitle = req.body.title
// 	var inputMessage = req.body.message

// 	myOrm.findWhere('users', inputUser, function(result){
// 		console.log(result.length)
// 		if (result.length < 0){ // if it's not existing, username should be added/inserted in users table
// 			myOrm.insertUser('users', inputUser, function(result){
				
// 			})
// 		}
// 	})
// 	.then(()=>{
// 	myOrm.insertMessages('messages', 'users', inputTitle, inputMessage, inputUser, function(result){
// 				console.log("inserted into messages1")
// 			})
// 	})
// 	res.render('thanks')// Thank you message for 2 sec then back to form.
// })




























