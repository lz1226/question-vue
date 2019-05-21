<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="name">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" v-loading="loading" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
	// import loginApi from '../../api/login';
//  import * as md5 from 'js-md5'
  import * as loginApi from '@/api/login';
  import {mapActions} from 'vuex'

    export default {
        name: "Login",
        data: function(){
            return {
                loading:false,
                ruleForm: {
                    name: 'test',
                    password: '123456'
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
          ...mapActions(['login']),
          async doLogin(param) {
            console.log("参数")
            console.log(param)
            const ret = await loginApi.login(param);
            console.log(ret.data)
            if (ret.code !== '2000') {
              this.$alert(ret.error)
            } else {
              const res = {};
              res.token = "aa";
              res.id = 1;
              res.name = "admin";
              res.sessionId = ret.data.sessionId;
              sessionStorage.setItem("sessionId", ret.data.sessionId);
              console.log(sessionStorage.getItem("sessionId"));
              // this.login(res);
              this.$router.push({path: '/home'});
            }

          },
          submitForm(formName) {
              const that = this;
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  const param = {};
                  console.log(that.ruleForm.name)
                  console.log(that.ruleForm.password)
                  param.name = that.ruleForm.name;
                  param.password = that.ruleForm.password;

                  const sysUser = {};
                  sysUser.name = that.ruleForm.name;
                  sysUser.password = that.ruleForm.password;
                  param.sysUser = sysUser;
//                  param.md5Password = md5(that.ruleForm.password);
                  that.doLogin(param);
                }else {
                  return false;
                }
              });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>
