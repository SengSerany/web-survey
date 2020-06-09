module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next;
        }
        req.flash('error_msg', 'Veillez-vous connecter pour poursuivre :)');
        res.redirect('/authentification/logIn');
    }
}