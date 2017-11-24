// Bulletin Board Application | FULL STACK COURSE OCT'17 - PATRICIA SCHUTTER 

// in terminal install : npm install -- save express / pg / pug / dotenv + 'npm init -y' in order to use these modules
const express = require("express")
const app = express()
const pg = require('pg')
const Client = pg.Client
// same as const {Client}= require('pg')
const bodyParser = require("body-parser")
require ('dotenv').load(); // using your .env file to enter your private variables, you don't want them to be send to github so everybody has access. 
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({extended:true}))// 


// below part to connect to the right database, details in .env file
const client = new Client({
	user: process.env.POSTGRES_USER,
	host: 'localhost',
	database: 'bulletinboard',
	password: process.env.POSTGRES_PASSWORD,
	port: 3000, // this is where database is running
})
client.connect((err) =>{
	if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

  
// to render index page with message form on it 
app.get('/', function (req, res) {
	res.render('index')
})

// Route to submit message to bulletin board.
app.post('/inputMessages', function(req, res){
	var inputTitle = req.body.title
	var inputMessage = req.body.message
	
	console.log('My input TITLE: ', inputTitle) // the title input from browser in terminal

	const query1 = { // inserting the message from client into database
		text: `INSERT INTO messages (title, body) values ('${inputTitle}', '${inputMessage}');`
	} 
	client.query(query1, (err, result) => { 
	})// processing the insert

	res.render('thanks') // Thank you message for 2 sec then back to form.
})

// Route to render page with all messages on it. 
app.get('/allMessages', function(req, res){
	const query2 = {
		text: 'SELECT * FROM messages;'
	}
	client.query(query2, (err, result) =>{
		console.log(result.rows)
	
			res.render('allMessages', {
				messagesArray: result.rows,
			})
	})
})


app.listen(3001, ()=> {
	console.log("listening on 3001")
}) // (3001, since I saved PostgreSQL on port 3000 by mistake.)




