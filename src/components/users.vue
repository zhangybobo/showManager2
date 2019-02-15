<template>
 <el-card>
  <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 搜索 -->
  <!-- clearable加入这个属性就可以在输入内容后删除时，末尾处会直接有个叉号删除 -->
  <!-- clear是input的方法，清除输入框的内容时自动触发的 -->
  <el-input clearable placeholder="请输入内容" v-model="query" @clear="getAllusers()" class="input-with-select" style="width:400px">
    <el-button slot="append" icon="el-icon-search" @click="searchUser()" ></el-button>
  </el-input>
  <el-button type="success" plain @click="showDialogAdd()">添加用户</el-button>
  
  <!-- table列表 -->
   <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
      <el-table-column  label="创建日期" width="200">
          <template slot-scope="scope">
              {{scope.row.create_time | fmtdat}}
          </template>
</el-table-column>
<el-table-column label="用户状态" width="120">
    <template slot-scope="scope">
              <el-switch
                 v-model="scope.row.mg_state"
                 active-color="#13ce66"
                 inactive-color="#ff4949">
              </el-switch>
          </template>
</el-table-column>
<el-table-column label="操作" width="200">
    <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
    <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
    <el-button type="success" icon="el-icon-check" circle size="mini" plain></el-button>
</el-table-column>
</el-table>
<!-- 分页 -->
<!-- page-sizes控制每页显示的数据条数 -->
<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
</el-pagination>
<!-- dialog对话框 -->
<el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
    <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
            <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formdata.password"></el-input>
        </el-form-item>
         <el-form-item label="电话">
            <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleAdd = false">确 定</el-button>
    </div>
</el-dialog>
</el-card>


</template>

<script>
    export default {
        data() {
            return {
                query: '',
                pagenum: 1,
                pagesize: 2,
                list: [],
                total: 0,
                formdata:{
                    username:'',
                    password:'',
                    email:'',
                    mobile:''
                },
                dialogFormVisibleAdd:false,
            }
        },
        created() {
            this.getUserData();
        },
        methods: {
            showDialogAdd(){
              this.dialogFormVisibleAdd=true
            },
            getAllusers() {
                this.getUserData();
            },
            searchUser() {
                this.getUserData();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagesize = val
                this.getUserData();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pagenum = val
                this.getUserData();
            },
            async getUserData() {
                //   需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
                const Askheader = localStorage.getItem('token')
                this.axios.defaults.headers.common["Authorization"] = Askheader
                const res = await this.axios.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
                console.log(res)
                const {
                    data,
                    meta: {
                        msg,
                        status
                    }
                } = res.data
                if (status === 200) {
                    this.list = data.users;
                    this.total = data.total
                }
            }
        },
    }
</script>

<style>
</style>