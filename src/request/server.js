import axios from 'axios'
import qs from 'qs'
const server = axios.create({
    baseURL:'/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout:5000,
    transformRequest: function(data, header){
        if (typeof(data) == 'object') {
            return qs.stringify(data)
        }
        return data
    },
    
})
// TODO:请求拦截处理
server.interceptors.request.use(config=>{
    return config
})

// TODO:返回拦截处理
server.interceptors.response.use(res=>{
    return res
})

export default server