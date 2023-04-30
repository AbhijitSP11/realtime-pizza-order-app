const passport = require('passport');
const User = require('../../models/user')
const bcrypt = require('bcrypt')

function authController (){
    /*factory functions, Object creating pattern --> function that returns OBJECT/
    All the logic is kept inside the controller */

    return {
        login (req, res) {
            res.render("auth/login");
        }, 
        postLogin(req, res, next){
            passport.authenticate('local', (err, user, info)=>{
              if(err){
                req.flash('error', info.message)
                return next(err)
              }
              if(!user){
                req.flash('error', info.message)
                console.log(info.message)
                return res.redirect('/login')
              }
              req.logIn(user, (err)=>{
                if(err){
                console.log(err)
                  return next(err)
                }
                return res.redirect('/')
              }) 
            })(req, res, next)
          },          

        register (req, res) {
            res.render('auth/register');
        },
        // async postRegister (req, res){
        //     //Destructure the data 
        //     const {name, email, password} = req.body
        //     //Validate request 
        //     if(!name || !email || !password){
        //         //We can flash messages for errors. Flash is only available for a single request.
        //         req.flash('error', 'All fields are required.')
        //         req.flash('name', name)
        //         req.flash('email', email)
        //         return  res.redirect('/register');
        //     }
        //                // Check if email exists 
        //     User.exists({ email: email }, (err, result) => {
        //         if(result) {
        //            req.flash('error', 'Email already taken')
        //            req.flash('name', name)
        //            req.flash('email', email) 
        //            return res.redirect('/register')
        //         }
        //     })
   
        //     // Hash password 
        //     const hashedPassword = await bcrypt.hash(password, 10)
        //     // Create a user 
        //     const user = new User({
        //         name,
        //         email,
        //         password: hashedPassword
        //     })
   
        //     user.save().then((user) => {
        //        // Login
        //        return res.redirect('/')
        //     }).catch(err => {
        //         req.flash('error', 'Something went wrong')
        //         return res.redirect('/register')
        //     })
        //     console.log(req.body)
        // }
        async postRegister (req, res){
            //Destructure the data 
            const {name, email, password} = req.body
            //Validate request 
            if(!name || !email || !password){
                //We can flash messages for errors. Flash is only available for a single request.
                req.flash('error', 'All fields are required.')
                req.flash('name', name)
                req.flash('email', email)
                return  res.redirect('/register');
            }
            
            // Check if email exists 
            const existingUser = await User.exists({ email: email })
            if(existingUser) {
                req.flash('error', 'Email already taken')
                req.flash('name', name)
                req.flash('email', email) 
                return res.redirect('/register')
            }
            
            // Hash password 
            const hashedPassword = await bcrypt.hash(password, 10)
            // Create a user 
            const user = new User({
                name,
                email,
                password: hashedPassword
            })
        
            try {
                await user.save()
                // Login
                return res.redirect('/')
            } catch (err) {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register')
            }
        },
        logout(req, res){
            req.logout((err) => {
                if(err) {
                    console.log(err)
                    return next(err)
                }
                return res.redirect('/login')
            })
        }
    }
}

module.exports = authController ;