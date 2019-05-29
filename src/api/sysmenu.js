import {get, post} from './base/request-util'

export const getTreeData = () => get('/sysMenu/tree/menu');

export const getData = (params) => get('/sysMenu/page/list',params);

export const save = (params) => get('/sysMenu/save',params);

/**
 * 通过菜单的id得到用户菜单的信息
 */
export const findMenu = (id) => get(`/sysMenu/find/${id}`);

/**
 * 编辑菜单信息
 */
export const editMenu = (sysMenu) => post('/sysMenu/edit',sysMenu);
/**
 * 添加菜单信息
 */
export const createMenu = (sysMenu) => post('/sysMenu/create',sysMenu);

/**
 * 批量删除菜单信息
 */
export const batchDelete = (ids) => post('/sysMenu/batchDelete',ids);

// import http from '@/util/http'
//
//
// export default {
//
//     getData : params => {
//         return http.get("/sys/menu/page/list", params);
//     },
//     getTreeData : params => {
//         return http.get("/sys/menu/tree/menu", params);
//     },
//     // 保存
//     save : params => {
//         return http.post("/sys/menu/save", params)
//     },
//     // 详情
//     info : params => {
//         return http.get("/sys/menu/info", params)
//     },
//
//     // 批量删除
//     batchDelete : ids => {
//         return http.post("/sys/menu/delete", ids)
//     },
//
//
//
// }
