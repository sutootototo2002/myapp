<template>
    <div>
        <div class="tenth-login" id='registDiv'>
    <div class='titleDiv'>修改密码{{mail}}-{{modifypwd}}</div>
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="新密码:" prop="password1">
    <el-input type="password" v-model="ruleForm2.password1" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="确认密码:" prop="password2">
    <el-input type="password" v-model="ruleForm2.password2" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">确定</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</div>
    </div>
</template>
<script>
import { modifypwd } from "../../api/api.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.password2 !== "") {
          this.$refs.ruleForm2.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        password1: "111",
        password2: "111"
      },
      modifypwd: "",
      mail: "",
      rules2: {
        password1: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {
    this.mail = this.$route.query.mail;
    this.modifypwd = JSON.parse(this.$cookies.get("mail"));
    if(this.mail !== this.modifypwd.mailname){
        alert('回到修改密码页');
        return this.$router.push('/sendmail');
    }else{
        alert('继续');
    }
  },
  methods: {
        //用户提交接口
    userSubmit(){
      //alert('用户提交');
      var that = this;
       var param = {
            password:this.ruleForm2.password1,
            mail:this.mail
        }
        modifypwd(param).then((res) => {
          console.log(res.data.code);
          if(res.data.code === 0){
             that.$message({
              message: '修改成功！',
             type: 'success'
        });
            //this.$cookies.set('abc','suxiaoyan')
            
            that.$router.push({ path: '/login' });

          }else{
             that.$message({
              message: res.data.message,
             type: 'error'
              });
          }
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         //alert("submit!");
          this.userSubmit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

