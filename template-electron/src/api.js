import axios from 'axios';
import * as util from '@/main/assets/util';

const HOST = {
    mock: 'http://rap2api.taobao.org/app/mock/223572',
    dev: 'http://xingrui.kaifa/japi',
    test: 'http://test.com/api',
    master: '//master.com/api'
};

const HASH = {
    "dev.com": HOST.dev,
    "test.com": HOST.test,
    "master.com": HOST.master
}

export const baseURL = HASH[window.location.host] || HOST.dev;

export const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 请求处理
instance.interceptors.request.use(function (config) {
    if(config.method==='get' || config.method==='delete'){
        for(let x in config.params){
            if(config.params[x]===''){
                config.params[x] = null
                console.log(`[${config.method} ${config.url}]参数[${x}]由''重置为null`)
            }
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应处理
instance.interceptors.response.use(function (response) {
    if (response.status != 200) {
        return util.catchError(response);
    }
    if(response.data.code === 500 && response.data.msg) {
        // 业务失败抛错
        return util.catchError({response})
    }
    // token续期
    if (response.headers['jwt-update-token']) {
        util.emit('login', {
            silent: true,
            data: {
                accessToken: response.headers['jwt-update-token']
            }
        })
    }
    return response;
}, function (error) {
    return util.catchError(error);
});