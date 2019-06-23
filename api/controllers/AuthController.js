const passport = require('passport');
const bcrypt = require('bcrypt-nodejs')

module.exports = {
    login: function(req, res) {
        passport.authenticate('login', function(err, user, info){

            if (err) {
                return res.status(500).send({error: err.toString()})
            }

            if (!user) {
                return res.status(500).send({error: info.message})
            }

            req.logIn(user, function(err) {
                if (err) {
                    return res.status(500).send({error: err.toString()})
                }

                return res.send({message: 'Successfully logged in.'})
            })
        })(req, res)
    },

    register: function(req, res) {
        console.log("Attempting Register")

        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, null, async function(err, hash) {
                try {
                    const user = {username: username, email: email, password: hash}
                    const record = await User.create(user).fetch()

                    req.logIn(user, function(err) {
                        if (err) {
                            const error = {error: 'Failed to register: ' + err.toString()}
                            return res.status(500).send(error)
                        }
                        res.send({message: 'User created with id: ' + record.id})
                    })

                    
                } catch (err) {
                    res.status(500).send({error: 'Could not register: ' + err.message})
                }
            })
        })
    },
    
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};