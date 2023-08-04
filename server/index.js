const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authenticateToken = require('./middleware/auth');
const signup = require('./routes/signup');
const login = require('./routes/login');
const addnote = require('./routes/addnote');
const getallnotes = require('./routes/getallnotes');
const getcurrentnote = require('./routes/getcurrentnote');
const updatenote = require('./routes/updatenote');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

//bodyparser for form data
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

//db
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {
    console.log('db connected');
    app.listen(port, () => {console.log('server started')});
})
.catch((err) => console.log(err));

app.use(
    cors({
        origin: 'https://mdjang.onrender.com'
    })
);

app.post('/signup', signup);

app.post('/login', login);

app.post('/addnote', authenticateToken, addnote);

app.get('/getallnotes', authenticateToken, getallnotes);

app.get('/getcurrentnote/:noteId', authenticateToken, getcurrentnote);

app.post('/updatenote', authenticateToken, updatenote);