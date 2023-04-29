require('dotenv').config;
const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path')
const session = require('express-session')
const flash = require('express-flash')
const app = express();
const MongoDbStore = require('connect-mongo'); //Class 


const PORT = process.env.PORT || 3300;

const mongoose = require('mongoose')

/* Database connection */

const url = 'mongodb://localhost/pizza';

mongoose.connect(url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true, 
});

const connection = mongoose.connection;

connection.on('error', (error) => {
  console.log('Connection failed...', error);
});

connection.once('open', () => {
  console.log('Database Connected...');
});

/* Session Store */

  /*Session Config --> Session  act as a middleware to the application so we'll use it with app.use
        Secret is required for cookies to encrypt cookies. 
        Sessions don't work without cookies. 
        By default sessions are stored in memory but we want to store it in database. 
        So we'll need a package called connect-mongo.*/

  app.use(session({
  secret: 'your-secret-value-here', 
  resave: false, 
  store: MongoDbStore.create({
    mongoUrl: url
}),               
  saveUninitialized: false, 
  cookie : {maxAge: 1000 * 60 * 60 * 24}
}))

app.use(flash())

/* Assets */ 
app.use(express.static('public'))

/* Global Middleware*/

app.use((req, res, next)=>{
  res.locals.session = req.session
  next()
})


/* Set template engine */ 

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.` )
})


