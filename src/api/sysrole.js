import {get, post} from './base/request-util'

/**
 * 获取用户角色信息
 */
export const listRole = ({pageNum, pageSize,roleName}) => post('/sysRole/list',{pageNum, pageSize,roleName});

/**
 * 通过用户的id得到用户角色的信息
 */
export const findRole = (id) => get(`/sysRole/find/${id}`);
/**
 * 编辑用户角色信息
 */
export const editRole = (sysRole) => post('/sysRole/edit',sysRole);
/**
 * 添加用户角色信息
 */
export const createRole = (sysRole) => post('/sysRole/create',sysRole);

/**
 * 添加用户角色信息
 */
export const batchDelete = (ids) => post('/sysRole/batchDelete',ids);

/**
 * 得到属性菜单的数据
 */
export const getMenuTreeData = (params) => get('/sysMenu/tree/menu',params);

// import http from '@/util/http'
//
//
// export default {
//   // 登录
//   getData : params => {
//     return http.get("/sys/role/page/list", params);
//   },
//   // 保存
//   save : params => {
//     return http.post("/sys/role/save", params)
//   },
//
//   // 批量删除
//   batchDelete : ids => {
//     return http.post("/sys/role/delete", ids)
//   },
//   getMenuTreeData : params => {
//     return http.get("/sys/menu/tree/menu", params);
//   },
//   getCheckMenuData:params => {
//     return http.get("/sys/role/menu/list", params);
//   },
//   saveMuenPerms:params => {
//     console.log(params);
//     return http.post("/sys/role/save/menu/perm", params);
//   }
//
//
// }

