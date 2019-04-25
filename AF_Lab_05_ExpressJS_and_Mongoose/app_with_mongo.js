'use strict';
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const mongoose = require('mongoose');
const UserSchemas = new mongoose.Schema({
    firstName: String,
    lastName: String,
    birthday: Date
});

const User = mongoose.model('User', UserSchemas);
module.exports = User;

mongoose.connect('mongodb://localhost:27017/expressjsSample', {useNewUrlParser: true}, err => {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        console.log('Successfully Connected to MongoDB');
    }
});
app.get('/', (req, res, next) => {
    res.sendFile('index.html');
});

app.get('/users', (req, res) => {
    User.find().exec().then(users => {
        res.json(users);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});
app.get('/users/:id', (req, res) => {
    User.findById(req.params.id).exec().then(user => {
        res.json(user || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(user => {
        res.json(user);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});
app.put('/users/:id', (req, res) => {
    const user = new User(req.body);
    User.findByIdAndUpdate(req.params.id, user).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

app.delete('/users/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});
app.listen(3000, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('App listening on port 3000');
});