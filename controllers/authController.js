module.exports = class authController{
    static login(req, res){
        return res.render('auth/login')
    }

    static register(req, res){
        return res.render('auth/register')
    }
}