import qs from 'qs';
import Vue from 'vue'
import server from './server.js';

function myServer(){
    // this.server = server;
    this.nowHandle = null
}

myServer.prototype.parseRouter = function(name,urlObj){
    var obj = this[name] = {}
    Object.keys(urlObj).forEach(item => {
        obj[item] = this.sendMes.bind(this,name,item,urlObj[item])
        obj[item].state = 'ready'
    })
}

myServer.prototype.v = function(obj){
    if(obj instanceof Vue){
        this.nowHandle = obj
        return this
    }else{
        console.warn('不是 vue 实例')
    }
    
}

myServer.prototype.sendMes = function(moduleName,name,url,config){
    var config = config || {}
    var type = config.type || 'get'
    var data = config.data || {}
    var bindName = config.bindName || name
    var self = this

    // 正式处理前--正式处理
    var before = function(mes){
        self[moduleName][name].state = 'ready'
        return mes
    }

    var defaultFn = function(mes){
        // 请求自动绑定
        self.nowHandle[bindName] = mes.data
    }

    var success = config.succ || defaultFn
    var callback = function(res){
        success(res,defaultFn)
    }

    var state = {
        get:()=>{
            var urlQs = url + '?' + qs.stringify(data)
            server.get(urlQs).then(before).then(callback)
        }
    }
    // 防止重复请求
    if(self[moduleName][name].state == 'ready'){
        self[moduleName][name].state = 'pending'
        state[type]()
    }
    
}

export default new myServer