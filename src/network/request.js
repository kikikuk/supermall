import axios from 'axios'

export function request(config) {
    //1.创建axois的实例
    const instance = axios.create({
        // baseURL: 'http://123.207.32.32:8000/api/hy',
        baseURL: 'http://106.54.54.237:8000/api/hy',
        timeout: 5000
    })

    //2.axios拦截器
    //2.1 请求拦截的作用
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        //   console.log(err);
    })

    //2.2响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    //3.发送真正的网络请求
    //这个函数返回的是一个promise，所以其他文件调用这个函数的时候可以直接.then
    return instance(config)
}