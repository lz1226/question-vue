import {get, post} from './base/request-util'

export const login = ({name,password,sysUser}) => post('/sysUser/login', {name,password,sysUser});
// import http from '@/util/http'
// export default {
//     // 登录
//     login : param => {
//         return http.post("/sysUser/login", param)
//     }
// }
