// Web related routes 

const homeController = require ('../app/http/controllers/homeController.js')
const authController = require ('../app/http/controllers/authController.js')
const cartController = require ('../app/http/controllers/customers/cartController.js')
const guest = require('../app/http/middlewares/guest.js')

function initRoutes(app) {
    /*
    1. Here we have passed a methods and 2 parameters in it.
    2. We receive request and response in second param.
    3. In Nodejs every file is a module.
    4. We access the object (INDEX) from the method. 
    */

    app.get("/", homeController().index)

    app.get("/cart",cartController().index)
    
    app.get("/login", guest, authController().login)
    app.post("/login", authController().postLogin)
    
    app.get("/register", guest, authController().register)
    app.post("/register", authController().postRegister)
    app.post("/logout", authController().logout)

    app.post('/update-cart', cartController().update)

}

module.exports = initRoutes;