var express = require('express');
var router = express.Router();
var User = require('../models/User');
var md5 = require('md5-node');
var mailer        = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');



//统一返回格式
var responseData;
router.use(function (req,res,next) {
    responseData = {
        code: 0,
        message: ''
    }
    return next();
})

//短信接口
const SMSClient = require('@alicloud/sms-sdk');
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIYOpGiICKbOec'
const secretAccessKey = 'v4JhYPfyMFiqyockxJwRt3VRXCS8A3'
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

/*退出登录*/
router.post('/loginout', function (req, res) {
  res.cookie("login",null);
  responseData.code = 0;
  responseData.message='退出成功！';
  res.json(responseData);
})

/*修改密码*/
router.post('/modifypwd', function (req, res) {
    // responseData.code = 0;
    // responseData.message='修改密码成功';
    // res.json(responseData);
    var mail = req.body.params.mail;
    var password = md5(req.body.params.password);
    User.update({"mail":mail},{"password":password}).then(function(info){
           console.log("修改：");
           console.log(info.ok);
           responseData.code = 0;
           responseData.message = "修改成功！";
           //responseData.userInfo = userInfo;
           //res.cookie("login",JSON.stringify(userInfo),{maxAge:1000*60*60*24});
           res.json(responseData);
    })
  })

/*发送邮件*/ 
router.post('/sendmail', function (req, res) {
  // responseData.code = 0;
  // responseData.message='邮件发送成功！';
  // res.json(responseData);
  console.log(req.body);
  var mail = req.body.params.mail;

  console.log("username");
  console.log(mail);
  var transport = mailer.createTransport(smtpTransport({
    host: 'smtp.qq.com',
    port: 465,
    auth: {
        user: '105807174@qq.com',
        pass: 'lmcnjaypijhbcafa'
    }
}));

var mailOptions = {
    from: '苏晓燕 <105807174@qq.com>', // 如果不加<xxx@xxx.com> 会报语法错误
    to: mail, // list of receivers
    subject: '密码修改邮件', // Subject line
    html: ' <p> 密码修改邮件</p> ' +
	'<p> 修改密码链接 <a href=\"http://localhost/modifypwd?mail='+mail+'\">http://localhost/modifypwd</a></p>'// html body
};

transport.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' );
        console.log(info);
        responseData.code = 0;
        responseData.message = "邮件发送成功！";
        responseData.mail = info. accepted;
        var mailInfo = {mailname:mail}
        res.cookie("mail",JSON.stringify(mailInfo),{maxAge:1000*60*60*24});
        return res.json(responseData);
    }
});
});
/*登录*/
router.post('/login', function (req, res) {
 
  // responseData.code = 0;
  // responseData.message='登录成功！';
  // res.json(responseData);
  console.log(req.body);
  //注册逻辑 用户名是否为空
  var username = req.body.params.username;
  var password = req.body.params.password;
  if (username === "") {
      responseData.code = -1;
      responseData.message = "用户名不能为空";
      return res.json(responseData);
  }
  if (password === "") {
      responseData.code = -1;
      responseData.message = "密码不能为空";
      return res.json(responseData);
  }
  User.find({
      username:username,
      password:md5(password)
  }).then(function(userInfo){
    console.log("登录信息：");
      console.log(userInfo);
      if(!userInfo){
        responseData.code = -1;
         responseData.message = "该用户不存在！";
         return res.json(responseData);
      }else{
          responseData.code = 0;
         responseData.message = "登录成功";
         res.cookie("login",JSON.stringify(userInfo),{maxAge:1000*60*60*24});
         return res.json(responseData);
      }
  }).catch(function (error) {//加上catch 
      console.log(error);
      responseData.code = -2;
      responseData.message = "登录出现意外！";
      return res.json(responseData);
    })

})
/* post 注册接口*/ 
router.post('/regist',function(req,res,next){
    //  responseData.code = 0;
    //  responseData.message = "注册接口畅通";
    //  return res.json(responseData);
 //注册逻辑 用户名是否为空
 console.log("req.body")
 console.log(req.body.params)
 var username = req.body.params.username;
 var password = req.body.params.password;
 var phone = req.body.params.phone;
 var mail = req.body.params.mail;
 if (username === "") {
     responseData.code = 1;
     responseData.message = "用户名不能为空";
     return res.json(responseData);
 }
 if (password === "") {
     responseData.code = 1;
     responseData.message = "密码不能为空";
     return res.json(responseData);
     
 }
 if (phone === "") {
     responseData.code = 1;
     responseData.message = "手机号不能为空";
     return res.json(responseData);
     
 }
 if (mail === "") {
    responseData.code = 1;
    responseData.message = "邮箱号不能为空";
    return res.json(responseData);
    
}
 var reqq = req;

 User.findOne({
     username:username
 }).then(function(userInfo){
     console.log("数据库查找没有相同用户名：");
     console.log(userInfo);
     if(userInfo){
         responseData.code = 4;
        responseData.message = "用户名已经被注册";
        return res.json(responseData);
     }
     var user = new User({
         username:username,
         password:md5(password),
         phone:phone
     });
      return user.save();
      
 }).then(function(userInfo){
     console.log("返回用户信息：");
     console.log("用户:"+userInfo);
     responseData.code = 0;
     responseData.message = "注册成功";
     //responseData.userInfo = userInfo;
     res.cookie("login",JSON.stringify(userInfo),{maxAge:1000*60*60*24});


     return res.json(responseData);
    
 }).catch(function (error) {//加上catch 
     console.log(error);
     responseData.code = 4;
     responseData.message = "注册有未知错误！";
     return res.json(responseData);
   })

});

/* post 短信验证码 */
router.post('/verificode',function(req,res,next){
    console.log(req.body.params.phone);
    //responseData.code = 0;
    //responseData.message = "验证码接口畅通";
    //return res.json(responseData);
     
      var phoneNum = req.body.params.phone;
      console.log("phoneNum")
      console.log(phoneNum)
        if (phoneNum === "") {
            responseData.code = 1;
            responseData.message = "手机号不能为空";
            return res.json(responseData);
        }
      var ress = res;
      var code = Math.floor(Math.random()*9000)+1000;
      smsClient.sendSMS({
          PhoneNumbers:phoneNum ,
          SignName: '苏晓燕',
          TemplateCode: 'SMS_137672486',
          TemplateParam: '{"code":'+code+'}'
      }).then(function (res) {
         console.log("res");
          console.log(res);
          let {Code}=res
          console.log("susususususuCode:"+res);
          if (Code === 'OK') {
              //处理返回参数
              console.log("sucess!");
              //console.log(res);
              responseData.code = 0;
              responseData.message = "短信发送成功！";
              responseData.responseNum = md5(code);
              return ress.json(responseData);
          }else{
              console.log("fail!");
              responseData.code = -1;
              responseData.message = "请不要频繁发送";
              return ress.json(responseData);
          }
      }).catch(function (error) {//加上catch 
          console.log("error");
          console.log(error);
          responseData.code = -1;
          responseData.message = "请不要频繁发送,请稍后再试！";
          return ress.json(responseData);
          
        })
  })

module.exports = router;
