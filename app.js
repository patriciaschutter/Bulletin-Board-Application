// Bulletin Board Application | FULL STACK COURSE OCT'17 - PATRICIA SCHUTTER 

// in terminal install : npm install -- save express / pg / pug / dotenv + 'npm init -y' in order to use these modules
const fs = require('fs')
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

// Route to submit message to bulletin board / & select users and messages
app.post('/inputMessages', function(req, res){
	var inputUser = req.body.username
	var inputTitle = req.body.title
	var inputMessage = req.body.message

	const query1 = {
		text: `SELECT * FROM users WHERE username = '${inputUser}';`
	}
	const query2 = {
		text: `INSERT INTO users (username) values ('${inputUser}');`
	}
	const query3 = {
		text: `INSERT INTO messages (title, body, user_id) SELECT '${inputTitle}', '${inputMessage}', users.id FROM users WHERE users.username = '${inputUser}'`
	}

///// VERSIE MET PROMISES
	client.query(query1)
	.then((result) => {
		if (result.rows.length !== 0) {
				client.query(query3)
		}
		else {
			client.query(query2).then(()=>{
				client.query(query3)
			})
			.catch(e => {
				console.log("The error: ", e)
			})
		}
	})
	.catch(e => {
		console.log("The error: ", e)
	})
	res.render('thanks')// Thank you message for 2 sec then back to form.
})


/////VERSION WITH CALLBACK
// 	client.query(query1, (err, result) => {
//        console.log("The query1", query1.text)
//        if(err){ 
//        	console.log("the error 1: ",err)
//        }
//        else {
//        	console.log("Result query1", result.rows) 
//        }   
//        if (result.rows.length !== 0){
//            client.query(query3, (err, result) => {
//                if(err) throw err
//                else console.log("Result third query", result)        
//            })
//        }

//        else {  
//            client.query(query2, (err, result) => {
//                if(err) console.log("second", err)
//                else console.log("Result second query", result)
//                client.query(query3, (err, result) => {
//                    if(err) throw err
//                    else console.log("Result third query", result)        
//                })
//            })
//        }
//    })
//    res.render('thanks')// Thank you message for 2 sec then back to form.
// })


///////// MIJN EERSTE VERSIE, ZONDER DE USERNAME 
	// const query1 = { // inserting the message from client into database
	// 	text: `INSERT INTO messages (title, body) values ('${inputTitle}', '${inputMessage}');`
	// } 
	// const query2 = {
	// 	text: `INSERT INTO users (username) values ('${inputUser}');`
	// }
	// client.query(query1, (err, result) => { 
	// })// processing the insert

	// res.render('thanks') // Thank you message for 2 sec then back to form.
// })

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

app.post('/selectUser', function(req, res){
	var userSearch = req.body.username
	var tekst = "All messages from: "
	console.log("USERSEARCX", userSearch)

	const query1 = {
		text: `SELECT * FROM messages WHERE user_id = (SELECT (id) FROM users WHERE username = '${userSearch}');`
	}

	client.query(query1)
	.then((result) =>{
		console.log("result.rows = ", result.rows)
		res.render('allmessages', {
			messagesArray: result.rows,
			userSelected: userSearch,
			userTekst: tekst,
		})
	})
	.catch(e => {
		console.log("The error: ", e)
	})
})



app.listen(3001, ()=> {
	console.log("listening on 3001")
}) // (3001, since I saved PostgreSQL on port 3000 by mistake.)




