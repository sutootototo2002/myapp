var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = new Schema({
    username:String,
    password:String,
    phone:String,
    mail:String,
    isAdmin:{
        type:Boolean,
        default:false
    }
})