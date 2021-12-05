const express = require('express')
const app = express()

//Middleware
// Serve static content
// app.use('/static', express.static('public') )
app.use( express.static('public') )

 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/home-page', (req, res) => {
  res.send('Hello home page visitors')
})

app.get('*', (req, res) => {
  // res.send('public/404.html')
  res.sendFile( __dirname + '/public/404.html')
})
 
app.listen(8080)