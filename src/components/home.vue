<template>
 <el-container class="container">
  <el-header>
      <el-row>
          <el-col :span='4'>
              <img src="@/assets/logo.png" alt="图片加载失败">
          </el-col>
          <el-col :span='19' class="middle">
              <h2>电商后台管理系统</h2>
          </el-col>
          <el-col :span='1'>
              <div class="grid-content bg-purple">
               <a href="#" @click.prevent="handleLoginout()" class="loginout">退出</a>
              </div>
          </el-col>
      </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px" class="aside">

       <el-menu default-active="1" class="el-menu-vertical-demo" :unique-opened="true" :router="true" >
        <el-submenu index="1">
           <template slot="title">
             <i class="el-icon-location"></i>
             <span>用户管理</span>
           </template>
           <el-menu-item index="users">
               <i class="el-icon-menu"></i>
              用户列表
           </el-menu-item>
        </el-submenu>
       <!-- 权限管理 -->
        <el-submenu index="2">
           <template slot="title">
             <i class="el-icon-location"></i>
             <span>权限管理</span>
           </template>
           <el-menu-item index="1-2">
               <i class="el-icon-menu"></i>
                角色列表
           </el-menu-item>
           <el-menu-item index="1-2">
               <i class="el-icon-menu"></i>
                权限列表
           </el-menu-item>
        </el-submenu>
       <!-- 商品管理 -->
       <el-submenu index="3">
           <template slot="title">
             <i class="el-icon-location"></i>
             <span>商品管理</span>
           </template>
           <el-menu-item index="1-2">
               <i class="el-icon-menu"></i>
                商品列表
           </el-menu-item>
           <el-menu-item index="1-2">
               <i class="el-icon-menu"></i>
                分类参数
           </el-menu-item>
           <el-menu-item index="1-2">
               <i class="el-icon-menu"></i>
                商品分类
           </el-menu-item>
        </el-submenu>
       <!-- 订单管理 -->
       <el-submenu index="4">
           <template slot="title">
             <i class="el-icon-location"></i>
             <span>订单管理</span>
           </template>
           <el-menu-item index="1-2">
               <i class="el-icon-menu"></i>
                订单列表
           </el-menu-item>
        </el-submenu>
       <!-- 数据统计 -->
       <el-submenu index="5">
           <template slot="title">
             <i class="el-icon-location"></i>
             <span>数据统计</span>
           </template>
           <el-menu-item index="1-2">
               <i class="el-icon-menu"></i>
                数据报表
           </el-menu-item>
        </el-submenu>
       </el-menu>
</el-aside>
<el-main class="main">
    <router-view></router-view>
</el-main>
</el-container>
</el-container>
</template>

<script>
    export default {
        beforeMount() {
            if (!localStorage.getItem('token')){//这里的token是健名
                 this.$router.push({
                     name:'login'
                 })
            }
        },
        methods: {
             handleLoginout() {
                localStorage.clear();
                this.$router.push({
                     name:'login'
                 })
             }
        },
    };
</script>

<style>
    .container {
        background-color: #b3c0d1;
        height: 100%;
    }

    .aside {
        background-color: pink;
    }

    .main {
        background: gray;
    }

    .middle {
        text-align: center;
        line-height: 60px;
    }

    .loginout {
        line-height: 60px;
        text-decoration: none;
    }
</style>