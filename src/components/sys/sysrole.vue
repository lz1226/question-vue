<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-people"></i> 角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">


                <el-input style="width: 130px" v-model="req.roleName" placeholder="请输入角色名称"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-button type="primary" icon="add" class="handle-del mr10" @click="handleAdd">新增</el-button>
            </div>
          <!-- v-loading="loading"-->
            <el-table :data="tableData" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>


                <el-table-column
                    label="角色名称"
                    align="center"
                    prop="roleName">
                </el-table-column>
                <el-table-column
                    label="备注"
                    align="center"
                    prop="remark">
                </el-table-column>

                <el-table-column
                    label="创建时间"
                    align="center"
                    prop="createTime">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        <el-button class="success" type="text" icon="el-icon-lx-lock" @click="handleConfigPerms(scope.$index, scope.row)">权限配置
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
              <template v-if="pagination && pagination.total > 0">
                <el-pagination
                  layout="prev, pager, next"
                  @current-change="handleCurrentChange"
                  :current-page="pagination.pageNum"
                  :page-size="pagination.pageSize"
                  :total="pagination.total">
                </el-pagination>
              </template>
              <template v-else>
                暂无数据!
              </template>
                <!--<el-pagination-->
                    <!--background-->
                    <!--:page-sizes="[10, 20, 30, 40, 50]"-->
                    <!--:page-size="page.pageSize"-->
                    <!--:current-page="page.pageNo"-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--@size-change="changePageSize"-->
                    <!--layout="prev, pager, next"-->
                    <!--:total="page.totalRows">-->
                <!--</el-pagination>-->
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">

            <el-form ref="role" :model="role" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model.trim="role.roleName"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model.trim="role.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
              <!-- :loading="loading"-->
            </span>
        </el-dialog>
        <!-- 编辑弹出框  check-strictly="true"   v-loading="loading"-->
        <el-dialog title="配置菜单" :modal="false" :visible.sync="configMenuDialog" width="30%">
            <el-tree show-checkbox node-key="id" :data="menuTreeData" :default-checked-keys="checkMenuData" :props="defaultProps"  ref="treeMenu" default-expand-all :expand-on-click-node="false" ></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="configMenuDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveMuenPerms">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
//    import RoleApi from '../../api/sysrole';
      import * as RoleApi from '../../api/sysrole';//这儿调用连接后台的js

    export default {
        name: 'basetable',
        data() {
            return {
                pagination: {pageSize: 5,},
                configMenuDialog:false,
                tableData: [],
//                page: {pageNo: 1, pageSize: 20},
                multipleSelection: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                role: {},
                idx: -1,
                ids: [],
                req: {},
                accountInput: true,
                // loading: false,
                menuTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                checkMenuData:[],
                roleId:null
            }
        },
        created() {
//            this.getData();
          this.initData();//在这儿调用初始时显示值
        },
        computed: {},
        methods: {
          handleCurrentChange(current) {
            this.pagination.pageNum = current;
            this.initData();
          },
          async initData() {
          //这个是初始方法，
              const param = {...this.pagination};
              console.log(this.req.roleName);
              param.roleName = this.req.roleName;
              const ret = await RoleApi.listRole(param);//这个是连接后台的controller
              console.log(ret.data)
              if(ret.code == "2000"){
                this.tableData = ret.data ? ret.data : [];
                this.tableData.forEach(item => {
                  item.status = Boolean(item.status);

                })
                this.pagination = ret.pagination;
              }else{
                this.$message.error("没有数据信息")
              }
          },
          //新增
          handleAdd() {
            this.role = {};
            this.editVisible = true;
          },
          //编辑
          handleEdit(index, row) {
            this.idx = index;
            const item = this.tableData[index];
            this.role = item;
            this.editVisible=true;

          },
          //保存编辑
          saveEdit() {
            const sysRole = this.role;
            //编辑
            if(sysRole.id > 0){
              RoleApi.editRole(sysRole);
              console.log("id")
            }else {
              //添加信息
              console.log("else")
              RoleApi.createRole(sysRole);
            };
            this.editVisible = false;
            this.initData();
          },
          handleDelete(index, row) {
            this.ids = [row.id];
            console.log(this.ids)
            this.delVisible = true;
          },
          delAll() {
            this.delVisible = true;
            this.ids = [];
            const length = this.multipleSelection.length;
            for (let i = 0; i < length; i++) {
              this.ids.push(this.multipleSelection[i].id);
            }
            console.log(this.ids)
          },
          // 确定删除
         async deleteRow() {
            const ids = this.ids;
            console.log(ids)
            const ret = await RoleApi.batchDelete(ids);
            this.initData();
            this.delVisible = false;
          },
          search() {
            this.is_search = true;
            this.initData();
          },
          handleConfigPerms(index, row) {
            // this.loading=true;
            this.roleId = row.id;
            this.checkMenuData=[];
            this.menuTreeData=[];
            console.log(this.roleId);
            this.getMenuTreeData();
            this.getCheckMenuData(this.roleId);
            this.configMenuDialog = true;

          },
         async getMenuTreeData() {
           // this.loading = false;
           const ret = await RoleApi.getMenuTreeData();
           console.log("授权")
           console.log(ret.data)
           if(ret.code === "2000"){
             this.menuTreeData = ret.data;
           }
          },
          async getCheckMenuData(roleId) {
           const ret = await RoleApi.getCheckMenuData(roleId);
           if(ret.code === "2000"){
             this.checkMenuData = ret.data;
           };
          },
           async saveMuenPerms(){
            console.log("this.checkMenuData ")
                this.checkMenuData = [];
                this.checkMenuData = this.checkMenuData.concat(this.$refs.treeMenu.getCheckedKeys());
                const params ={id:this.roleId,menuIds:this.checkMenuData}
                const ret = await RoleApi.saveMuenPerms(params);
                if(ret.code === "2000"){
                    console.log(ret.data);
                    this.initData();
                  this.$message.success("授权成功！");
                }else{
                  this.$message.success("授权失败！");
                }
                this.configMenuDialog = false;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }
    .success {
        color: #67C23A;
    }
</style>
