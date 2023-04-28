function authController (){
    /*factory functions, Object creating pattern --> function that returns OBJECT/
    All the logic is kept inside the controller */

    return {
        login (req, res) {
            res.render("auth/login");
        }, 
        register (req, res) {
            res.render('auth/register');
        }
    }
}

module.exports = authController ;