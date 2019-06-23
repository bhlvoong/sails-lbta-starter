const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt-nodejs')

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findOne({id}, function(err, user) {
        cb(err, user);
    });
});

passport.use('login', new LocalStrategy(async function(username, password, cb) {
    try {
        const user = await User.findOne({username: username})
        if (!user) {
            return cb(null, false, {message: 'No user exists for this username'})
        }

        bcrypt.compare(password, user.password, function(err, didMatch) {
            if (err) { return cb(err) }

            if (!didMatch) {
                return cb(null, false, {message: 'Password did not match'})
            }

            cb(null, user)
        })

    } catch (err) {
        cb(err)
    }
}))