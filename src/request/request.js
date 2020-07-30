import Vue from 'vue'
import server from './server.js';

function myServer(){
    // this.server = server;
    this.nowHandle = null
}
/**
 * 初始化API模块及方法
 * @param  {} name API模块名称 
 * @param  {loginIn:'/api/loginIn.php'} urlObj API地址对象
 */
myServer.prototype.parseRouter = function(name,urlObj){
    var obj = this[name] = {}
    Object.keys(urlObj).forEach(item => {
        obj[item] = this.sendMes.bind(this,name,item,urlObj[item])
        // 防止重复请求，定义初始状态
        obj[item].state = 'ready'
    })
}
/**
 * 注入VUE实例，使得请求返回后能将数据直接绑定至vue
 * @param  {} obj
 */
myServer.prototype.v = function(obj){
    if(obj instanceof Vue){
        this.nowHandle = obj
        return this
    }else{
        console.warn('不是 vue 实例')
    }
    
}
/**
 * 正式发送请求
 * @param  {} moduleName    API模块名
 * @param  {} name  API模块下方法名
 * @param  {} url   请求地址
 * @param  {} config    配置
 */
myServer.prototype.sendMes = function(moduleName,name,url,config){
    var config = config || {}
    var type = config.type || 'get'
    var data = config.data || {}
    var bindName = config.bindName || name
    var self = this

    // 正式处理前--正式处理
    var before = function(mes){
        // 防止重复请求，请求完成重置状态
        self[moduleName][name].state = 'ready'
        return mes
    }

    var defaultFn = function(mes){
        // 绑定数据到vue
        self.nowHandle[bindName] = mes.data
    }
    // 定义成功数据处理方法，如果不需要操作数据则直接绑定数据至vue
    var success = config.success || defaultFn
    var callback = function(res){
        success(res.data,defaultFn)
    }
    // 使用策略模式定义请求方法
    var state = {
        get:()=>{
            server.get(url,{
                params:data
            }).then(before).then(callback)
        },
        post:()=>{
            server.post(url,data).then(before).then(callback)
        }
    }
    // 防止重复请求，允许状态为‘ready’请求
    if(self[moduleName][name].state == 'ready'){
        self[moduleName][name].state = 'pending'
        // 发送请求
        state[type]()
    }
    
}

export default new myServer