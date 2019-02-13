<template>
    <div class="login-wrap">
        <el-form class="login-form" :label-position="labelPosition" label-width="80px" :model="formdata">
            <h2>用户登录</h2>
            <el-form-item label="姓名">
              <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="formdata.password"></el-input>
            </el-form-item>
              <el-button type="primary" class="login-btn" @click.prevent="showLogin()">登录</el-button>
        </el-form>
        
    </div>
</template>

<script>
    export default {
      data(){
        return {
       labelPosition:'top',
       formdata:{
         username:'',
         password:''
              }
        }
      },
      methods: {
         async showLogin(){
              const res=await this.axios.post('login',this.formdata)
              const {
                      data:{
                           data:{token},
                           meta:{msg,status}
                      }
                      }=res
                  if (status === 200)
                  {
                    //第一个token是key，第二个token是value
                    localStorage.setItem('token',token)
                     this.$router.push({
                         name:'home'
                     })
                  }
                  else {
                      this.$message.error(msg);
                  }
              /*
              .then(res=>{
                  const {
                      data:{
                           data,
                           meta:{msg,status}
                      }
                      }=res
                  if (status === 200)
                  {
                     this.$router.push({
                         name:'home'
                     })
                  }
                  else {
                      this.$message.error(msg);
                  }
              })
              */
          }
      },
    }
</script>
 
<style>
.login-wrap {
    height: 100%;
    background-color:  #324152;
    display: flex;
    justify-content: center;
    align-items: center;
 }
 .login-form {
   width: 400px;
   background-color: #fff;
   border-radius: 10px;
   padding: 30px;
 }
 .login-btn {
   width: 100%;
 }
</style>