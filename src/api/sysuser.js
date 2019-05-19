import {get, post} from './base/request-util'

export const login = ({name,password,sysUser}) => post('/sysUser/login', {name,password,sysUser});

/**
 * 获取用户信息
 */
export const listUser = ({pageNum, pageSize}) => post('/sysUser/list', {pageNum, pageSize});

/**
 * 通过用户的id得到用户的信息
 */
export const findUser = (id) => get(`/sysUser/find/${id}`);
/**
 * 编辑用户信息
 */
export const editUser = ({sysUser,roleIds}) => post('/sysUser/editUser',{sysUser,roleIds});



// import http from '@/util/http'
//
//
// export default {
//     // 登录
//     getData : params => {
//         return http.get("/sys/user/page/list", params);
//     },
//     // 保存
//     save : params => {
//         return http.post("/sys/user/save", params)
//     },
//
//     // 批量删除
//     batchDelete : ids => {
//         return http.post("/sys/user/delete", ids)
//     },
//
//     // 批量更改状态
//     changeStatus : (userId, flag) => {
//
//         return http.post("/sys/user/change/status/" + flag, userId)
//     },
//     resetPassword: ids => {
//         return http.post("/sys/user/reset/password", ids)
//     },
//     getRoleList:params =>{
//         return http.get("/sys/role/list", params);
//     },
//     info:params =>{
//         return http.get("/sys/user/info", params);
//     }
// }
