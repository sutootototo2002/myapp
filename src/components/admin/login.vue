<template>
<div class="tenth-login" id='registDiv'>
    <div class='titleDiv'>用户登录</div>
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名:" prop="username">
    <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密  码:" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item>
      <div class='loginInfo'><a href="javascript:;" @click='turnPath()'>用户注册</a> <a href="javascript:;">忘记密码</a></div>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
import { login } from "../../api/api.js";
import { showtime } from "../../common/common.js";
export default {
  data() {
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
        checkPass: ""
      },
      rules2: {
        username: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
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
      this.$router.push({ path: '/regist' });
    },
    //用户提交接口
    userSubmit(){
      //alert('用户提交');
      var that = this;
       var param = {
            username:this.ruleForm2.username,
            password:this.ruleForm2.checkPass
        }
        login(param).then((res) => {
          console.log(res.data.code);
          if(res.data.code === 0){
             that.$message({
              message: '登录成功！',
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
