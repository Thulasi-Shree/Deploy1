const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")});
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) );
const helmet = require('helmet');
const morgan = require('morgan');


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const corsOptions = {
  origin: ['http://localhost:8000','http://127.0.0.1:3000','http://localhost:3001', 'http://127.0.0.1:3001'] ,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const auth = require('./routes/auth')
const admin = require('./routes/admin')
const menu = require('./routes/menu')
const restaurant = require('./routes/restaurant')
const address = require('./routes/address')
const feedback = require('./routes/feedBack')
const userActivity = require('./routes/userActivity')
const order = require('./routes/order')
const transaction = require('./routes/transaction')
const location = require('./routes/location')
const carousal = require('./routes/carousal')
const category = require('./routes/category');
const multer = require('multer');


app.use('/api',category);
app.use('/api',auth);
app.use('/api',admin);
app.use('/api',menu);
app.use('/api',restaurant); 
app.use('/api', address);
app.use('/api', feedback);
app.use('/api', userActivity);
app.use('/api', order);
app.use('/api', transaction);
app.use('/api', location);
app.use('/api', carousal);

app.use(helmet()); 


app.use(morgan('combined'));  
 

  app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "img-src 'self' data: http://localhost:8000 http://127.0.0.1:8000");
    next();
  });
  

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}
app.use(errorMiddleware)

module.exports = app;