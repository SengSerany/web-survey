const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user_model');

module.exports = async (passport) => {
    await passport.use(
        new LocalStrategy({ usernameField: 'email'}, async (email, password, done) => {
            let user =  await User.findOne({email: email});
            if (user === null){
                return done(null, false, { errors: [{ msg: "Cet email est déja utilisé :o ..."}]})
            }
            await bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch){
                    return done(null, user, {success: [{msg: "Tu es bien connecté !"}]});
                } else {
                    return done(null, false, {errors: [{ msg: "Le mot de passe est erroné" }]})
                };
            });
        })
    );

    await passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    await passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}