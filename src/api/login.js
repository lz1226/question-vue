import http from '@/util/http'
export default {
    // 登录
    login : param => {
        return http.post("/sysUser/login", param)
    }
}
