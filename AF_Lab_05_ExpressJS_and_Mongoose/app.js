'use strict';
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

let users = new Array();
app.get('/', (req, res, next) => {
    res.sendFile('index.html');
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    res.json(user);
});

app.post('/users', function (req, res) {
    const user = req.body;
    user.birthday = new Date(user.birthday);
    user.id = Date.now();
    users.push(user);
    res.json(user);
});

app.put('/users/:id', (req, res) => {
    const user = req.body;
    user.birthday = new Date(user.birthday);
    //delete user.id;
    const index = users.findIndex(user => user.id === parseInt(req.params.id));
    users[index].birthday = user.birthday;
    res.json(users[index]);
});

app.delete('/users/:id', (req, res) => {
    const user = req.body;
    const index = users.findIndex(user => user.id === parseInt(req.params.id));
    users.splice(index, 1);
    res.sendStatus(200);
});

app.listen(3000, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('App listening on port 3000');
});