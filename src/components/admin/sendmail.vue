<template>
<div class="tenth-login" id='registDiv'>
    <div class='titleDiv'>找回密码</div>
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="请输入邮箱:" prop="mail">
    <el-input type="text" v-model="ruleForm2.mail" auto-complete="off"></el-input>
  </el-form-item>
        <el-form-item>
      <div class='loginInfo'><a href="javascript:;" @click='turnPath()'>直接登录</a></div>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">发送邮件</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
import { sendmail } from "../../api/api.js";

export default {
  data() {
    //var validatePass = (rule, value, callback) 
        var validatePass = (rule, value, callback) => {
      if (!value) {       
        return callback(new Error("邮箱不能为空！"));
      }
      
      setTimeout(() => {
          var myreg = /^[A-Za-z0-9_-]+([-_.][A-Za-z0-9_-]+)*@([A-Za-z0-9_-]+[-.])+[A-Za-zd]{2,5}$/;
          // /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
          if (!myreg.test(value)) {
            callback(new Error("邮箱格式不正确"));
          } else {
            
            callback();
          }
        
      }, 1000);
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      dis:false,
      content:'获取验证码',
      totalTime: 10, 
      canClick: false,
      ruleForm2: {
        mail: "",
        checkPass: ""
      },
      rules2: {
        mail: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.userSubmit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //跳转
    turnPath(){
      this.$router.push({ path: '/login' });
    },
    //用户提交接口
    userSubmit(){
      //alert('用户提交');
      var that = this;
       var param = {
            mail:this.ruleForm2.mail
        }
        sendmail(param).then((res) => {
          console.log(res.data.code);
          if(res.data.code === 0){
             that.$message({
              message: '发送邮件成功！到 '+res.data.mail[0],
             type: 'success'
        });
          console.log("mail:00");
          console.log(this.$cookies.get('mail'));
          //that.$router.push({path:'/modifypwd'});
          }else{
             that.$message({
              message: res.data.message,
             type: 'error'
              });
          }
        })
    },
    //短信接口
    verifiFn(){
      var that = this;
       var param = {
            phone:this.ruleForm2.phone
        }
        verificode(param).then((res) => {
          console.log(res);
          if(res.code === 0){
             that.$message({
              message: '发送成功！',
             type: 'success'
        });
          }else{
             that.$message({
              message: '发送失败请重试！',
             type: 'error'
              });
          }
        });
    },
    verificodeFn() {
       if (!this.canClick) return  //改动的是这两行代码
        this.canClick = false
         this.verifiFn();
        let clock = window.setInterval(() => {
        this.totalTime--;
        this.dis = true;
        this.content = this.totalTime + 's后重新发送';
        if (this.totalTime < 0) {     //当倒计时小于0时清除定时器
            window.clearInterval(clock);
            this.content = '重新发送验证码';
            this.totalTime = 10;
            this.dis = false;
             this.canClick = true;
    }
    },1000)

    }
  }
};
</script>
<style>
.loginInfo{float:right}
.tenth-login {
  position: absolute;
  top: 25%;
  left: 50%;
  width: 550px;
  margin-left: -275px;
  overflow: hidden;
  background: #f6f8f7;
  text-align: left;
  border-radius: 0.4em;
  -o-border-radius: 0.4em;
  -webkit-border-radius: 0.4em;
  -moz-border-radius: 0.4em;
}
#registDiv .el-form-item__label {
  text-align: left;
  float: left;
  font-size: 14px;
  color: #606266;
  padding: 0px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
#registDiv .titleDiv {
  font-size: 1.2em;
  color: #646464;
  font-family: "微软雅黑";
  background: #eee;
  padding: 20px 0 20px 0;
  text-align: left;
  text-indent: 20px;
  margin-bottom: 20px;
}
#registDiv .demo-ruleForm {
  padding: 20px;
}
</style>
