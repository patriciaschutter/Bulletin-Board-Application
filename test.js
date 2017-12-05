client.connect((err) => console.log(err))

app.post("/", (req, res) => {

   const query1 = {
      text: `select * from users where username = '${req.body.name}';`
   }

   const query2 = {
      text: `insert into users (username) values ('${req.body.name}');`
   }

   const query3 = {
       text: `insert into messages (title,body,user_id) SELECT '${req.body.title}','${req.body.body}', users.id FROM users WHERE users.username = '${req.body.name}'`
   }

   client.query(query1, (err, result) => {
       console.log("The query1", query1.text)
       // if(err) throw err
       // else console.log("Result query1", result.rows)    
       if (result.rows.length !== 0){
           client.query(query3, (err, result) => {
               if(err) throw err
               else console.log("Result third query", result)        
           })
       }

       else {  
           client.query(query2, (err, result) => {
               if(err) console.log("second", err)
               else console.log("Result second query", result)
               client.query(query3, (err, result) => {
                   if(err) throw err
                   else console.log("Result third query", result)        
               })
           })
       }
   })
   res.redirect("/form2")
})




function writeFilePromise(file, type) {
    return new Promise(function(resolve, reject) {
        fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
             if (err) {
                 reject (err)
             }
             else {
                 resolve()
             }
        })
    })
}

writeFilePromise("helloworld.txt", "utf-8")
.then(result => {
    console.log("written to file!")
    return "result2"
})
.then(result2 => {
    console.log("second action undertaken after file written")
    return "result3"
})
.catch(e => {
    console.log("writefile error, e")
})



let newPromise = new Promise(function(resolve, reject){
//  setTimeout(function(){
//    resolve("work complete, I was a succes!")
//  }, 3000)
// })
//  // reject("I am a failure :(")

// newPromise
// .then((result)=> {
//  // console.log(result) // succes/resolve handler, will say I was a succes // now it has to wait 3 seconds.
//  return result 
// // }, (negativeResult) => {
//  // console.log(negativeResult)
// }) // second function in then is the error handler. >> will say I am a failure
// .then((result2) =>{
//  console.log(result2)
// })
