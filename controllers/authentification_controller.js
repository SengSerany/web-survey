const bcrypt = require('bcrypt');
const User = require('../models/user_model');
const passport = require('passport');
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');


exports.logIn = async (req, res) => {
    try {
        await res.render('authentification/logIn');
    } catch (error) {
        return res.status(500).send(err);
    }
}

exports.signIn = async (req, res) => {
    try {
        let user = await new User();
        await res.render('authentification/signIn', {user: user});
    } catch (error) {
        return res.status(500).send(err);
    }
}

exports.connect = async (req, res, next) => {
    try {
        await passport.authenticate('local', {
            successRedirect: '/authentification/success',
            failureRedirect: '/authentification/failed',
            failureFlash: true,
            successFlash: true
        })(req, res, next);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.register = async (req, res) => {
    const errors = [];
    const {username, email, password, passwordConfirm} = req.body;

    if (!validationResult(req).isEmpty()) {
        let user = await new User();
        errors.push(validationResult(req))
        return res.render('authentification/signIn', {user: user, errors: errors});
    } else if (!username || !email || !password || !passwordConfirm) {
        let user = await new User();
        return res.render('authentification/signIn', {user: user, errors: [{msg: "Veuillez bien remplir tout les champs"}]});
    } else if (password !== passwordConfirm) {
        let user = await new User();
        return res.render('authentification/signIn', {user: user, errors: [{msg: "Les deux mots de passe ne correspondent pas"}]});
    } else if (password.length < 6) {
        let user = await new User();
        return res.render('authentification/signIn', {user: user, errors: [{msg: "Le mot de passe doit contenir 6 caractères minimum"}]});
    }

    try {
        let searchUser = await User.findOne({ email: email })
        if (searchUser !== null) {
            let user = new User();
            return res.render('authentification/signIn', {user: user, errors: [{msg: "L'email à déja été utilisé'"}]});
        } else {
            bcrypt.genSalt(10, async (err, salt) => {
                await bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) throw err;

                    let user = await User.create({
                        username: username,
                        email: email,
                        password: hash
                    });

                    req.flash("success_msg", "Tu es bien inscris, il ne te reste qu'à te connecter !");
                    res.redirect('logIn');
                })
            });
        }

    } catch (error) {
        let user = new User();
        console.log(error)
        return res.render('authentification/signIn', {user: user, err: error});

    }
}

exports.success = async (req, res) => {
    res.render('home/home', {success: [{ msg:  "Tu es bien connecté ! :)"}]});
}

exports.failed = async (req, res) => {
    res.render('authentification/logIn', {errors: [{ msg: "Le mot de passe ou l'email est erroné" }]})
}

exports.logout = async (req, res) => {
    req.logout();
    req.flash('success_msg', 'Vous êtes déconnecté !');
    res.redirect('/');
}