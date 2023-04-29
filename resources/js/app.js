import axios from "axios"
import Noty from 'noty'

//Client Code - will get compiled and get saved in public > js > app.js

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelectorAll('#cartCounter')

function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res => {
        console.log(res)
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Pizza added to your cart'
        }).show()
}).catch(err => new Noty({
    type: 'error',
    timeout: 1000,
    text: 'Something went wrong'
}).show())
   
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})