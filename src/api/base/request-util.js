import * as axios from 'axios'
// import {REFRESH_TOKEN} from "../../store/mutation-types"
import store from '@/store';
import {app} from '@/main';


// const baseUri = 'http://localhost:9000/v3/cmcc';
// 通讯地址前缀
export let baseUri = '';
// 图片地址前缀
export let imageUri = '';

if (process.env.NODE_ENV === 'production') {
    // 生产环境
    // baseUri = 'http://admin.downtonbutler.com/v3';
    // imageUri = 'https://image.downtonbutler.com/v3/';
    // 测试环境
    baseUri = 'http://test.admin.downtonbutler.com/v3';
    imageUri = 'http://test.image.downtonbutler.com/v3/';
} else {
    // development
    baseUri = 'http://localhost:8989';
    imageUri = 'http://localhost:8888/';
}

function assembleTokenHeader() {
    const headers = {};
    const token = store.getters.getToken;
    if (!!token) {
        headers['Token'] = token;
    }
    return headers;
}


function reLogin(data) {
    app.$notify.error({title: data.desc, message: data.error});
    localStorage.clear();
    sessionStorage.clear();
    app.$router.push({path: '/login'})
}

export const get = (uri) => {
    uri = baseUri + uri;
    return axios({
        method: 'get',
        url: uri,
        headers: {...assembleTokenHeader()},
    }).then(response => {
        if (response.status === 200) {
            if (response.headers && response.headers['token']) {
                refreshToken(response.headers['token'])
            }
            const data = response.data;
            if (data.code === '4008') {
                return reLogin(data);
            }
            return data;
        }
    });
};

// function getImage(uri, imageType, callback) {
//     uri = baseUri + uri;
//
//     const headers = assembleTokenHeader();
//     headers['Accept'] = 'image/gif';
//     return axios({
//         method: 'get',
//         url: uri,
//         headers,
//         responseType: 'arraybuffer',
//     }).then(res => {
//         return `data:image/${imageType};base64,` + btoa(
//             new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
//         );
//     }).then(data => {
//         if (callback) {
//             callback(data)
//         }
//         return data;
//     })
// }
//
//
// export const getGif = (uri, callback) => {
//     return getImage(uri, 'gif', callback)
// };


export const post = (uri, body) => {
    uri = baseUri + uri;
    return axios({
        method: 'post',
        url: uri,
        headers: {...assembleTokenHeader()},
        data: body
    }).then(response => {
        if (response.status === 200) {
            if (response.headers && response.headers['token']) {
                refreshToken(response.headers['token'])
            }
            const data = response.data;
            if (data.code === '4008') {
                return reLogin(data);
            }
            return data;
        }
    });
};
