<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-people"></i> 菜单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">


                <el-input style="width: 150px" v-model="req.name" placeholder="请输入菜单名称"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <!--<el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
                <el-button type="primary" icon="add" class="handle-del mr10" @click="handleAdd">新增</el-button>
            </div>
            <!--<el-table :data="tableData" v-loading="loading" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column
                    label="菜单名称"
                    align="center"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="菜单URL"
                    align="center"
                    prop="url">
                </el-table-column>
                <el-table-column
                    label="授权标识"
                    align="center"
                    prop="perms">
                </el-table-column>
                <el-table-column
                    label="类型 "
                    align="center"
                    prop="typeName">
                </el-table-column>
                <el-table-column
                    label="菜单图标"
                    align="center"
                    prop="icon">
                </el-table-column>
                <el-table-column
                    label="排序"
                    align="center"
                    prop="orderNum">
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>-->
            <tree-table :data="treeData" :columns="columns" :expandAll="true" border>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </tree-table>
            <!--<div class="pagination">-->
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
            <!--</div>-->
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">

            <el-form ref="menu" :model="menu" label-width="100px">
                <el-form-item label="父菜单" prop="parentId">
                    <el-input @click.native="goToSelectMenu" readonly="readonly" v-model.trim="menu.pname"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称" prop="name">
                    <el-input v-model.trim="menu.name"></el-input>
                </el-form-item>
                <el-form-item label="菜单URL" prop="url">
                    <el-input v-model.trim="menu.url"></el-input>
                </el-form-item>
                <el-form-item label="授权标识" prop="perms">
                    <el-input v-model.trim="menu.perms"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="menu.type" placeholder="请选择">
                        <el-option
                            v-for="item in menuType"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon">
                    <el-input v-model.trim="menu.icon"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="orderNum">
                    <el-input v-model.trim="menu.orderNum"></el-input>
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" :loading="loading" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="选择父级菜单" :modal="false" :visible.sync="selectMenuDialog" width="30%">
            <el-tree :data="treeData" row-key="id" :props="defaultProps" default-expand-all :expand-on-click-node="false" @node-click="selectMenuClick"></el-tree>
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
    import treeTable from '@/components/TreeTable'
//    import MenuApi from '../../api/sysmenu';
    import * as MenuApi from '../../api/sysmenu';

    export default {
        name: 'basetable',
        components: { treeTable },
        data() {
            return {
                selectMenuDialog:false,
                tableData: [],
                treeData: [],
                page: {pageNo: 1, pageSize: 20},
                multipleSelection: [],
//                is_search: false,
                editVisible: false,
                delVisible: false,
                menu: {},
                idx: -1,
                ids: [],
                req: {name:''},
                accountInput: true,
                loading: false,
                menuType:[
                    {value:0,name:"目录"},
                    {value:1,name:"菜单"},
                    {value:2,name:"按钮"}
                ],
                columns: [
                    {
                        text: '菜单名称',
                        value: 'name',
                        width: 200
                    },
                    {
                        text: 'url',
                        value: 'url'
                    },
                    {
                        text: '权限标识',
                        value: 'perms'
                    },
                    {
                        text: '菜单类型',
                        value: 'typeName'
                    },
                    {
                        text: '图标',
                        value: 'icon'
                    },
                    {
                        text: '排序',
                        value: 'orderNum'
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }

            }
        },
        created() {
            this.getTreeData();
        },
        methods: {
          async getTreeData() {
            const sysMenuDto = {};
            sysMenuDto.name = this.req.name;
            const ret = await  MenuApi.getTreeData(sysMenuDto);
            if(ret.code === "2000"){
              this.treeData = ret.data;
              this.wrapMenuType(this.treeData);
            }else{
              this.$message.error("数据不存在!");
            }
          },
          //编辑
          async handleEdit(index, row) {
               this.menu.delFlag = 0;
              const ret = await MenuApi.findMenu(row.id);
              if(ret.code === "2000"){
                this.menu = ret.data;
              }else{
                this.loading = false;
                this.$message.error("失败!");
              }
               this.editVisible = true;
          },
          handleAdd() {
               this.menu = {};
               this.menu.delFlag = 0;
               this.editVisible = true;
          },
            goToSelectMenu(){
               this.selectMenuDialog = true;
            },
            selectMenuClick(data){
               this.selectMenuDialog = false;
               this.menu.parentId=data.id;
               this.menu.pname=data.name;
            },
          // 保存编辑
          saveEdit() {
            const sysMenu = this.menu;
            //编辑
            if(sysMenu.id > 0){
              MenuApi.editMenu(sysMenu);
            }else {
              //添加信息
              MenuApi.createMenu(sysMenu);
            };
            this.editVisible = false;
            this.getTreeData();
          },
          handleDelete(index, row) {
            this.ids = [row.id];
            this.delVisible = true;
          },
          delAll() {
                this.delVisible = true;
                this.ids = [];
                const length = this.multipleSelection.length;
                for (let i = 0; i < length; i++) {
                    this.ids.push(this.multipleSelection[i].id);
                }

          },
          // 确定删除
          async deleteRow() {
              const ids = this.ids;
            const ret = await MenuApi.batchDelete(ids);
            if(ret.code === "2000"){
              this.$message.success("删除成功!");
            }
            this.getTreeData();
            this.delVisible = false;
          },
          wrapMenuType(treeData){
            treeData.forEach(item=>{
              item.typeName = this.menuType[item.type].name;
              if(item.children){
                this.wrapMenuType(item.children);
              }
            })

          },
          search() {
//            console.log(this.req.name)
            this.getTreeData();
//                this.is_search = true;
//                this.getTreeData();
          },
//            handleSelectionChange(val) {
//                this.multipleSelection = val;
//            },
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
</style>
