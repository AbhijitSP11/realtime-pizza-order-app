const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function init(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      // Login
      // Check if email exists
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'Email does not exist' });
      }
      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          return done(null, user, { message: 'Successfully logged in.' });
        }
        return done(null, false, { message: 'Wrong username or password.' });
      }).catch((err) => {
        return done(null, false, { message: 'Something went wrong.' });
      });
    })
  );
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
})

}

module.exports = init;
