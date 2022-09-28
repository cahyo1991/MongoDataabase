const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();

const db  = require('./app/models/')    
db.mongoose.connect(db.url)
    .then(() => {
        console.log(`Database Connected`)
    }).catch((err) => {
        console.log(`error`,err)
        process.exit()
    });

app.use(express.json())
app.use(express.urlencoded({extended:true}));
////// Add headers cors header 
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*') //FIXME
    // res.setHeader('Access-Control-Allow-Origin', 'https://erecruit.azurewebsites.net')
  
    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') //FIXME
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')
  
    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // res.setHeader('Access-Control-Allow-Headers', '*') //FIXME
    res.setHeader('Access-Control-Allow-Headers', 'x-auth-token, content-type')
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', false)
    res.setHeader('Access-Control-Allow-Credentials', true)
  
    // Pass to next layer of middleware
    next()
  })

require('./app/routes/post.routes')(app)
require('./app/routes/pam.router')(app)
require('./app/routes/main.routes')(app)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(` SERVER IS RUNNING on http://localhost:${PORT}`);
})