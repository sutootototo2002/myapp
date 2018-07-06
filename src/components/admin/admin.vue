<template>
    <div id='admin'>
      <el-container>
  <el-header>
    <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-submenu index="2">
<template slot="title"><span>欢迎登陆  </span><span>{{loginInfo.username}}</span></template>
    <el-menu-item index="2-1">修改密码</el-menu-item>
    <el-menu-item index="2-2">修改信息</el-menu-item>
    <el-menu-item index="2-3" @click='loginOut()'>退出登录</el-menu-item>
  </el-submenu>
</el-menu>

  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
    </div>
</template>
<script>
import { loginout } from "../../api/api.js";
export default {
  data() {
    return {
      loginInfo: "", //登录数据
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  created() {
    this.loginInfo = JSON.parse(this.$cookies.get('login'));
  },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      loginOut(){
        var that = this;
        var param = {
             
          }
        loginout(param).then((res) => {
          that.$router.push({ path: '/login' });
          if(res.data.code === 0){
             that.$message({
              message: res.data.message,
             type: 'success'
        });
      }else{
         that.$router.push({ path: '/login' });
         that.$message({
              message: "意外出错！",
             type: 'error'
        });
      }
    })
}
}
};
</script>
<style>
.welcomeSpan{display:inline-block;padding:0px 10px;font-size:15px;}
#admin .el-header,
#admin .el-footer {
  background-color: rgb(84, 92, 100);
  color: #333;
  text-align: center;
  line-height: 60px;
  padding:0;
}
#admin .el-menu--popup-bottom-start {
    margin-top:0px;
}

#admin .el-menu-demo{
   float:right
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
