const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const todoList = require('./routes/todolist');
const auth = require('./routes/auth.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
// app.use(cors('*'));
app.use('/api/v1', todoList);
app.use('/api/v1', auth);

module.exports = app;