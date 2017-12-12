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
	res.render('thanks')// Thank you message for 2 sec then back to form.
})

//Route to render all messages from selected user
app.post('/selectUser', function(req, res){
	var userSearch = req.body.username
	var tekst = "All messages from: "
	console.log("USERSEARCX", userSearch)

	myOrm.selectFrom('messages', 'users', userSearch, function(result){
		res.render('allmessages', {
			messagesArray: result,
			userSelected: userSearch,
			userTekst: tekst,
		})
	})
})

// Port site is listening on
app.listen(process.env.port2, ()=> {
	console.log("listening")
}) 


