const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtsController {
    static async showToughts(req, res){
        return res.render('toughts/home')
    }
}