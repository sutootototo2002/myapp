<template>
    <div id='admin'>
      <el-container>
  <el-header>
    <span>blog管理系统</span>
    <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#1b6ec0"
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
    <el-aside width="200px">
      <el-col :span="12" style='width:100%'>
    <el-menu
      default-active="2" 
      router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#fff">
      <el-submenu index="1">
        <template slot="title">
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
         
          <el-menu-item index="/usermanager">管理员列表</el-menu-item>
          <el-menu-item index="1-2">权限管理</el-menu-item>
           <el-menu-item index="1-2">角色管理</el-menu-item>
        </el-menu-item-group>
  
      </el-submenu>
      
    </el-menu>
  </el-col>
    </el-aside>
    <el-main><router-view></router-view></el-main>
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
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
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
  background-color: #1b6ec0;
  color: #fff;
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

#admin .el-submenu {
    text-align: left;
  
}
#admin .el-main {
  line-height:33px;
}

#admin .el-submenu .el-menu-item {
    
    min-width: 150px;
}

.el-aside {
   background-color: rgb(84, 92, 100);
  color: #333;
  text-align: center;
  height:1000px;
}


#admin .el-menu {
    border-right: solid 1px #b65207;
    
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
