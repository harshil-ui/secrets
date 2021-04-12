//jshint esversion:6
const express = require('express')
let ejs = require('ejs');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()
const port = 3000

app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())


mongoose.connect('mongodb://localhost/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = new mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    })

    newUser.save(err => {
        if (!err) {
            res.render('secrets')
        }
    });
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    username = req.body.username;
    password = req.body.password;

    User.findOne({
        email: username
    }, (err, foundUser) => {
        if (err) {
            res.send(err)
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render('secrets')
                }
            }
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})