import {get,post} from '../../api/base/request-util'

export const getNavList = () => get('/sysMenu/nav');


// import http from '@/util/http'
//
//
// export default {
//     // 修改密码
//     modifyPwd : params => {
//         return http.post("/sys/user/change/password", params)
//     },
//     handleLogout:()=>{
//     	return http.get("/logout", {})
//     },
//     getNavList:()=>{
//         return http.get("/sys/menu/nav", {})
//     }
//
// }
