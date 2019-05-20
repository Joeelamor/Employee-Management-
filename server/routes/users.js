const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myApp', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

router.get('/get', (req, res) => {
    User.find({}, (err, users) => {
        if (err)
            res.status(500).end(err);
        res.status(200).json({users});
    });
});

router.get('/get/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err)
            res.status(500).send(err);
        res.status(200).json({user});
    })
});

router.post('/insert', (req, res) => {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.title = req.body.title;
    user.sex = req.body.sex;
    user.age = req.body.age;
    user.password = req.body.password;

    user.save((err, user) => {
        if (err)
            res.status(500).send(err);
        res.status(200).json({user});
        
            
    })
});

router.put('/update/:id', (req, res) => {
    var newUser = req.body;
    User.findOneAndUpdate({_id: req.params.id, password: req.body.password}, {$set: newUser}, {new: true}, (err, user) => {
        if (!user)
            return res.status(401).send('Password is not matched!');
        if (err)  
            return res.status(500).send(err);
        return res.status(200).json({user});
        
    });

     
});

router.delete('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) 
            return res.status(500).send(err);
        return res.status(200).json({user});
        
    })
});

module.exports = router;