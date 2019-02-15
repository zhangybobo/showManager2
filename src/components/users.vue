<template>
 <el-card>
  <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 搜索 -->
  <!-- clearable加入这个属性就可以在输入内容后删除时，末尾处会直接有个叉号删除 -->
  <el-input clearable placeholder="请输入内容" v-model="query" class="input-with-select" style="width:400px">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
  <el-button type="success" plain>添加用户</el-button>
  
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
      <el-table-column  label="用户状态" width="120"></el-table-column>
      <el-table-column prop="操作" label="电话" width="200"></el-table-column>

    
    </el-table>
 </el-card>
 
 
</template>

<script>
    export default {
       data(){
           return{
               query:'',
               pagenum:1,
               pagesie:2,
               list:[],
           }
       },
       created() {
           this.getUserData();
       },
       methods: {
          async getUserData(){
            //   需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
              const Askheader=localStorage.getItem('token')
              this.axios.defaults.headers.common["Authorization"]=Askheader
               const res=await this.axios.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesie}`)
               console.log(res)
               const {
                   data,
                   meta:{msg,status}
               }=res.data
               if (status === 200)
               {
                   this.list=data.users
               }
           }
       },
    }
</script>

<style>
</style>