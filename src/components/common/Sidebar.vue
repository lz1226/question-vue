<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in menuItems">
                <template v-if="item.list">
                    <el-submenu :index="item.url" :key="item.url">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.list">
                            <el-submenu v-if="subItem.list" :index="subItem.url" :key="subItem.url">
                                <template slot="title">{{ subItem.name }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.list" :key="i" :index="threeItem.url">
                                    {{ threeItem.name }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.url" :key="subItem.url">
                                {{ subItem.name }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.url">
                        <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
//    import AccountApi from '../common/account';
    import * as AccountApi from '../common/account';
    export default {
        data() {
            return {
                collapse: false,
                menuItems:[]
//                menuItems:[
//                  {
//                    icon: "el-icon-lx-home",
//                    id: "1",
//                    name: "系统首页",
//                    orderNum: 0,
//                    parentId: "0",
//                    perms: "sys:dashboard:info",
//                    type: 1,
//                    url: "dashboard"
//                  },
//                  {
//                    icon: "el-icon-lx-settings",
//                    id: "15",
//                    list: [
//                      {
//                        id: "16",
//                        name: "用户管理",
//                        orderNum: 16,
//                        parentId: "15",
//                        perms: "sys:user:list",
//                        type: 1,
//                        url: "sysuser"
//                      },
//                      {
//                        id: "17",
//                        name: "角色管理",
//                        orderNum: 17,
//                        parentId: "15",
//                        perms: "sys:role:list",
//                        type: 1,
//                        url: "sysrole"
//                      },
//                      {
//                        id: "18",
//                        name: "菜单管理",
//                        orderNum: 18,
//                        parentId: "15",
//                        perms: "sys:menu:tree",
//                        type: 1,
//                        url: "sysmenu",
//                      },
//                      {
//                        id: "19",
//                        name: "部门管理",
//                        orderNum: 19,
//                        parentId: "15",
//                        perms: "sys:dept:tree",
//                        type: 1,
//                        url: "sysdept"
//                      },{
//                        id: "21",
//                        name: "定时任务",
//                        orderNum: 21,
//                        parentId: "15",
//                        perms: "sys:schedule:list",
//                        type: 1,
//                        url: "schedulejob"
//                      }
//                    ],
//                    name: "系统管理",
//                    orderNum: 15,
//                    parentId: "0",
//                    type: 0,
//                    url: "sys"
//                  }
//                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
             this.getNavList();
        },
        methods:{
           async getNavList(){
             const ret = await AccountApi.getNavList();
             if(ret.code === "2000"){
               this.menuItems = ret.data;
             }else{
               this.list = [],
               this.$message.error("失败");
             }


//                AccountApi.getNavList().then((res)=>{
//                        this.menuItems = res.data;
//                        // localStorage.setItem("menuItems",res.data);
//
//                    },
//                    (err) => {
//                    this.list = []
//                    this.$message.error(err.msg);
//                })
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
