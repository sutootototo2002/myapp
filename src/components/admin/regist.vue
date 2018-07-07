<template>
<div class="tenth-login" id='registDiv'>
    <div class='titleDiv'>用户注册</div>
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名:" prop="username">
    <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密  码:" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="邮 箱:" prop="mail">
    <el-input type="text" v-model="ruleForm2.mail" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="手机号:" prop="phone">
    <el-input v-model.number="ruleForm2.phone"></el-input>
  </el-form-item>
   <el-form-item label="验证码:" prop="yznumber">
    <el-input v-model.number="ruleForm2.yznumber" style="width: 55%;"></el-input> <el-button id='vCode'  @click="verificodeFn()"  v-bind:disabled="!canClick" style='margin-left:25px;'>{{content}}</el-button>
  </el-form-item>
      <el-form-item>
      <div class='loginInfo'><a href="javascript:;" @click='turnPath()'>直接登录</a></div>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</div>

</template>
<script>
import { verificode,regist } from "../../api/api.js";
import { showtime } from "../../common/common.js";
export default {
  data() {
            var validateMail = (rule, value, callback) => {
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
    var checkNumber = (rule, value, callback) => {
      if (!value) {       
        return callback(new Error("验证码不能为空！"));
      }
      
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          var myreg = /^\d{4}$/;
          if (!myreg.test(value)) {
            callback(new Error("必须是4位数字!"));
          } else {
            
            callback();
          }
        }
      }, 1000);
    };
    var checkAge = (rule, value, callback) => {
      if (!value) {
        this.canClick = false;
        return callback(new Error("手机号不能为空"));
      }
      var that = this;
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(value)) {
            callback(new Error("必须是已13,15,17,18开头得11位数字!"));
          } else {
            this.canClick = true;
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
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
        username: "",
        checkPass: "",
        mail:"",
        phone: "",
        yznumber: ""
      },
      rules2: {
        username: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkAge, trigger: "blur" }],
        yznumber: [{ validator: checkNumber, trigger: "blur" }],
        mail: [{ validator: validateMail, trigger: "blur" }]
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
            username:this.ruleForm2.username,
            password:this.ruleForm2.checkPass,
            phone:this.ruleForm2.phone
        }
        regist(param).then((res) => {
          console.log(res.data.code);
          if(res.data.code === 0){
             that.$message({
              message: '注册成功！',
             type: 'success'
        });
            //this.$cookies.set('abc','suxiaoyan')
            
            console.log(JSON.parse(this.$cookies.get('login')));
            that.$router.push({ path: '/admin' });

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
