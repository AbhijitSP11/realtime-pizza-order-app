const Menu = require('../../models/menu')

function homeController (){
    /*factory functions, Object creating pattern --> function that returns OBJECT/
    All the logic is kept inside the controller */

    return {
       async index (req, res) {
            /* 1. Index is a function (Object with a method )
               2. All the logic comes here. */

            const pizzas = await Menu.find()
            console.log(pizzas)
            return res.render('home', {pizzas: pizzas})

            
        }
    }
}

module.exports = homeController;