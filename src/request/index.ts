import axios from 'axios'

const baseURL =  'https://mock.presstime.cn/mock/661d3ce829894e1d8bf35976/example'
// 创建axios实例
const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})

// 请求拦截 处理token
instance.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem("token")) {
        config.headers.token = localStorage.getItem('token') || ""
    }
    return config
})

// 响应拦截
instance.interceptors.response.use((res) => {
    const status: number = res.data.data.status;
    if (status !== 200) {
        return Promise.reject(res.data)
    }
    return res.data
}, (error) => {
    console.log(error)
})

export default instance;


