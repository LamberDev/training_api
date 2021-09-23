const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

// Cada vez que alguien haga una req a este endpoint se corre dicha funcion
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body; //Desectructuramos el body
        const user = new User({ email, password });//Creamos user
        await user.save();//Lo guardamos en la bbdd
        //Creamos token
        const token = jwt.sign({userId: user._id},'MY_SECRET_KEY');
        res.send({token: token});
    } catch(err) {
        return res.status(422).send(err.message);
    }
    
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' });
    }

    const user = await User.findOne({email});

    if(!user) {
        return res.status(422).send({error: 'Invalid password or email'});
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
    } catch (err) {
        return res.status(422).send({error: 'Invalid password or email'});
    }
});

module.exports = router;