<template>
   <div id='usermanager'>
  <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      >
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      show-overflow-tooltip>
    </el-table-column>
        <el-table-column
      prop="phone"
      label="手机号"
      show-overflow-tooltip>
    </el-table-column>
        <el-table-column
      prop="mail"
      label="邮箱"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { usermanager } from "../../api/api.js";
  export default {
    data() {
      return {
        tableData3: [{
          username: 'admin',
          password: 'asdfghj',
          phone: '15801030115',
          mail:'105807174@qq.com',
          isAdmin:false
        }],
        multipleSelection: []
      }
    },
     created(){
         this.userSubmit();
     },
    methods: {
     userSubmit(){
      //alert('用户提交');
      var that = this;
       var param = {
        
        }
        usermanager(param).then((res) => {
          console.log(res.data);
          if(res.data.code === 0){
             that.tableData3 = JSON.parse(that.$cookies.get('userList'));
             console.log('userList:')
             console.log(that.$cookies.get('userList'))
             that.$message({
              message: '导入管理员成功！',
             type: 'success'
        })
          }else{
             that.$message({
              message: res.data.message,
             type: 'error'
              });
          }
        })
    },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>
<style>
   #usermanager .el-table td, .el-table th {
    text-align: left;
}
</style>