import axios from 'axios'
import { commonParams } from '../api/config'
import { Message } from 'element-ui'

const Http = {

    get(url, params) {
        const data = Object.assign({}, commonParams, params);
      // console.log("urlget")
      // console.log(url)
        // url = "/beam_ht" + url
        url = "http://localhost:8989" +  url
        return axios.get(url, {
            params: data,
        }).then((res) => {

            if(res.data.code === '2000'){
                return Promise.resolve(res.data); //成功
            }
            else{
                if (res.data.code === -1) {
                    Message.error(res.data.msg);
                    window.location = "/#/login";
                    return Promise.reject(res) //拒绝
                }
                else if(res.data.code === 403){
                    Message.error(res.data.msg);
                    window.location = "/#/403";
                    return Promise.reject(res) //拒绝
                }
                else{
                    Message.error(res.data.msg);
                    return Promise.reject(res) //拒绝
                }

            }



        }).catch((err) => {


            // console.log(err.request)

            //超时之后在这里捕抓错误信息.
            if (err.response) {

                var res = {
                    code: err.code,
                    msg: err.message,
                }
                return Promise.reject(res)

            } else if (err.request) {

                if(err.request.readyState == 4 && err.request.status == 0){

                    //我在这里重新请求
                    var res = {
                        code: 403,
                        msg: "网络链接错误，请刷新重试！",
                    }

                    this.$message.error("网络链接错误，请刷新重试！")
                    return Promise.reject(res)
                }
            } else {

                Message.error( err.message)
                return Promise.reject(res)
            }
            return Promise.reject(err)

        })
    },
    post(url, data) {
        // console.log("urlpost")
        // console.log(url)
        // console.log(data)
        // url = "/beam_ht" + url
        url = "http://localhost:8989" + url
        // url = "http://localhost:8080/login"
        // url = url
        return axios.post(url, data).then((res) => {
          // console.log("走了")
          //   console.log(res.data)
            if(res.data.code === '2000'){
                // console.log("ifPost")
                return Promise.resolve(res.data); //成功
            }
            else{
              // console.log("else")
                if (res.data.code === -1) {
                    Message.error(res.data.msg);
                    window.location = "/#/login";
                    return Promise.reject(res) //拒绝
                }
                else if(res.data.code === 403){
                    Message.error(res.data.msg);
                    window.location = "/#/403";
                    return Promise.reject(res) //拒绝
                }
                else{
                    Message.error(res.data.msg);
                    return Promise.reject(res) //拒绝
                }


            }

        }).catch((err) => {
            //超时之后在这里捕抓错误信息.
            // console.log("捕捉")
            if (err.response) {
                var res = {
                    code: err.code,
                    msg: err.message,
                }
                return Promise.reject(res)
            } else if (err.request) {
                if(err.request.readyState == 4 && err.request.status == 0){
                    //我在这里重新请求
                    var res = {
                        code: 403,
                        msg: "网络链接错误，请刷新重试！",
                    }

                    this.$message.error("网络链接错误，请刷新重试！")
                    return Promise.reject(res)
                }
            } else {

                Message.error( err.message)
                return Promise.reject(res)
            }
            return Promise.reject(err)
        })
    },

};

export default Http;
