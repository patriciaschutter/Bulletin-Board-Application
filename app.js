// Bulletin Board Application | FULL STACK COURSE OCT'17 - PATRICIA SCHUTTER 

// in terminal install : npm install -- save express / pg / pug / dotenv + 'npm init -y' in order to use these modules
const fs = require('fs')
const express = require("express")
const app = express()
const pg = require('pg')
const Client = pg.Client
// same as const {Client}= require('pg')
const bodyParser = require("body-parser")
var cookieParser = require('cookie-parser')
const myOrm = require('./myOrm.js')

require ('dotenv').load(); // using your .env file to enter your private variables, you don't want them to be send to github so everybody has access. 
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({extended:true}))// 

app.use(cookieParser()); 


myOrm.initialize({
	user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port
})


// Route to render page with all messages on it. 
app.get('/allMessages', function(req, res){

	myOrm.findAll('messages', function(result){
		console.log(result)
		res.render('allMessages', {
					messagesArray: result,
		})
	})
	
})

// to render index page with message form on it 
app.get('/', function (req, res) {
	res.render('index')
})

// Route to submit message to bulletin board / & select users and messages
// app.post('/inputMessages', function(req, res){
// 	var inputUser = req.body.username
// 	var inputTitle = req.body.title
// 	var inputMessage = req.body.message

// 	myOrm.findWhere('users', inputUser, function(result){
// 		if (result.length !== 0){ // if it's truthy username exists
// 			myOrm.insertMessages('messages', 'users', inputTitle, inputMessage, inputUser, function(result){})
// 		}
// 		else {
// 			myOrm.insertUser('users', inputUser, function(result){})
// 			.then(() => {
// 			myOrm.insertMessages('messages', 'users', inputTitle, inputMessage, inputUser, function(result){})
// 			})
// 			.catch(e => {
// 				console.log("The error 1: ", e)
// 			})
// 		}
// 	})
// 	res.render('thanks')// Thank you message for 2 sec then back to form.
// })

app.post('/inputMessages', function(req, res){
	var inputUser = req.body.username
	var inputTitle = req.body.title
	var inputMessage = req.body.message

	myOrm.findWhere('users', inputUser, function(result){
		console.log(result.length)
		if (result.length <= 0){ // if it's not existing, username should be added/inserted in users table
			myOrm.insertUser('users', inputUser, function(){
				myOrm.insertMessages('messages', 'users', inputTitle, inputMessage, inputUser, function(result){
				console.log("inserted into users and messages")
				})
			})
		} 
		else {
			myOrm.insertMessages('messages', 'users', inputTitle, inputMessage, inputUser, function(result){
				console.log("only inserted into messages")
			})
		}
	})
	// .then(()=>{
	
	// })
	res.render('thanks')// Thank you message for 2 sec then back to form.
})


// 	const query1 = {
// 		text: `SELECT * FROM users WHERE username = '${inputUser}';`
// 	}
// 	const query2 = {
// 		text: `INSERT INTO users (username) values ('${inputUser}');`
// 	}
// 	const query3 = {
// 		text: `INSERT INTO messages (title, body, user_id) SELECT '${inputTitle}', '${inputMessage}', users.id FROM users WHERE users.username = '${inputUser}'`
// 	}

// ///// VERSIE MET PROMISES
// 	client.query(query1)
// 	.then((result) => {
// 		if (result.rows.length !== 0) {
// 				client.query(query3)
// 		}
// 		else {
// 			client.query(query2).then(()=>{
// 				client.query(query3)
// 			})
// 			.catch(e => {
// 				console.log("The error: ", e)
// 			})
// 		}
// 	})
// 	.catch(e => {
// 		console.log("The error: ", e)
// 	})
// 	res.render('thanks')// Thank you message for 2 sec then back to form.


// Route to render all messages from selected user
// app.post('/selectUser', function(req, res){
// 	var userSearch = req.body.username
// 	var tekst = "All messages from: "
// 	console.log("USERSEARCX", userSearch)

// 	const query1 = {
// 		text: `SELECT * FROM messages WHERE user_id = (SELECT (id) FROM users WHERE username = '${userSearch}');`
// 	}

// 	client.query(query1)
// 	.then((result) =>{
// 		console.log("result.rows = ", result.rows)
// 		res.render('allmessages', {
// 			messagesArray: result.rows,
// 			userSelected: userSearch,
// 			userTekst: tekst,
// 		})
// 	})
// 	.catch(e => {
// 		console.log("The error: ", e)
// 	})
// })


// Port site is listening on
app.listen(3001, ()=> {
	console.log("listening on 3001")
}) 


