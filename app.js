// external exports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// internal exports
const {notFoundHandler, errorHandler} = require('./middlewares/common/errorHandler');

const app = express();
dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Database connection successfull!'))
.catch(err => console.log(err));

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public ")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//route setup

//404 not found handling
app.use(notFoundHandler);

// common error handller
app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log("App running on port " + process.env.PORT)
});
