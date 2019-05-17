<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                      <img src="../../assets/logo.png" class="user-avator" alt="">
                      <div class="user-info-cont">
                        <div class="user-info-name">test</div>
                        <div>游客</div>
                      </div>
                        <!--<img :src="sysuser.avatar" class="user-avator" alt="">-->
                        <!--<div class="user-info-cont">-->
                            <!--<div class="user-info-name">{{sysuser.account}}</div>-->
                            <!--<div>{{sysuser.roleNames[0]}}</div>-->
                        <!--</div>-->
                    </div>
                    <div class="user-info-list">真实姓名：<span>test</span></div>
                    <div class="user-info-list">所在部门：<span>产品部</span></div>
                    <!--<div class="user-info-list">真实姓名：<span>{{sysuser.name}}</span></div>-->
                    <!--<div class="user-info-list">所在部门：<span>{{sysuser.deptName}}</span></div>-->
                </el-card>

            </el-col>

        </el-row>

    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    import DashboardApi from '../../api/dashboard';

    export default {
        name: 'dashboard',
        data() {
            return {

                user : null,
                todoList: [{
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: false,
                    }, {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: true,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true,
                    }
                ],
            }
        },
        components: {
            Schart
        },
        computed: {
//            sysuser(){
//                let sysuser = JSON.parse(localStorage.getItem('sysuser'));
//                console.log(sysuser.account);
//                console.log(sysuser.avatar);
//                return sysuser?sysuser:this.user;
//            }
        },
        created(){
//            this.getDashboardContent();
//            this.handleListener();
        },
        activated(){
//            this.handleListener();
        },
        deactivated(){
//            window.removeEventListener('resize', this.renderChart);
//            bus.$off('collapse', this.handleBus);
        },
        methods: {

//            getDashboardContent(){
//                DashboardApi.getDashboardContent().then((res)=>{
//                    console.log(res);
//                },(err) => {
//                    console.log("错误信息")
//                    console.log(err)
//                    this.$message.error(err.msg);
//                })
//            },
//            handleListener(){
//                bus.$on('collapse', this.handleBus);
//                // 调用renderChart方法对图表进行重新渲染
//                window.addEventListener('resize', this.renderChart)
//            },
//            handleBus(msg){
//                setTimeout(() => {
//                    this.renderChart()
//                }, 300);
//            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

</style>
