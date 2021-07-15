const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth.route');

const app = express();

//config.env path
require('dotenv').config({path: './config/config.env'})

//connect to database
connectDB();

//use development tools
if(process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: process.env.CLIENT_URL
  }))
  app.use(morgan('dev'))
};

//use bodyParser
app.use(json());
app.use(urlencoded({ extended: true }));

//use routes
app.use('/api', authRouter);

app.get('/api/hello', async (req, res) => {
  res.send('hello world')
});

//default 404
app.use((req,res,next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found"
  })
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));