const { json } = require("express");

function cartController (){
 return {
    index (req, res) {
        res.render("customers/cart");
        
    }, 
    update(req, res){
        // let cart = {
        //     items: {
        //         pizzaId : {
        //             item: pizzaObject, 
        //             quantity: 0
        //         }
        //     }, 
        //     totalQty : 0, 
        //     totalPrice: 0,
        // }

        if(!req.session.cart){
            req.session.cart = {
                items: {},
                totalQty : 0, 
                totalPrice: 0,
            }
        }
        let cart = req.session.cart

        //Check if item does not exist in cart
        if(!cart.items[req.body._id]){
           
            cart.items[req.body._id] = {
                item : req.body, 
                quantity : 1
            }
            cart.totalQty = cart.totalQty + 1;
            cart.totalPrice = cart.totalPrice + req.body.price
        }
        else{
            cart.items[req.body._id].quantity = cart.items[req.body._id].quantity + 1
            cart.totalQty = cart.totalQty +1 
            cart.totalPrice = cart.totalPrice + req.body.price 
        }

        return res.json({totalQty: req.session.cart.totalQty})
    }
 }
}

module.exports = cartController;
