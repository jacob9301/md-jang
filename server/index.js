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

const app = express();

//bodyparser for form data
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

//db
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {
    console.log('db connected');
    app.listen(5000, () => {console.log('server started on port 5000')});
})
.catch((err) => console.log(err));

app.use(
    cors({
        origin: 'http://127.0.0.1:5173'
    })
);

app.post('/signup', signup);

app.post('/login', login);

app.post('/addnote', authenticateToken, addnote);

app.get('/getallnotes', authenticateToken, getallnotes);

app.get('/getcurrentnote/:noteId', authenticateToken, getcurrentnote);

app.post('/updatenote', authenticateToken, updatenote);