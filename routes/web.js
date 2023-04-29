// Web related routes 

const homeController = require ('../app/http/controllers/homeController.js')
const authController = require ('../app/http/controllers/authController.js')
const cartController = require ('../app/http/controllers/customers/cartController.js')

function initRoutes(app) {
    /*
    1. Here we have passed a methods and 2 parameters in it.
    2. We receive request and response in second param.
    3. In Nodejs every file is a module.
    4. We access the object (INDEX) from the method. 
    */

    app.get("/", homeController().index)

    app.get("/cart",cartController().index)
    
    app.get("/login", authController().login)
    
    app.get("/register", authController().register)

    app.post('/update-cart', cartController().update)

}

module.exports = initRoutes;