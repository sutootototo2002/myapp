var mongoose = require('mongoose');
mongoose.connect('mongodb://120.78.229.228:27017/blog');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("数据库成功连接");
});
var usersSchema = require('../schemas/user');
module.exports = mongoose.model('User',usersSchema);