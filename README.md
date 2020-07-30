# api-middle-layer
####基于axios的二次封装
---
当前只实现 get、post
- 实现api接口化
- 数据自动绑定
- 防止重复请求

目录结构：
```

|-- src
    |-- api
    |   |-- index.js
    |   |-- login.js
    |   |-- pledge.js
    |   |-- shop.js
    |-- request
        |-- request.js
        |-- server.js

```

使用方式：
```
import server from './api/index.js'
mounted() {
    server.pledge.borrowConf({
        type:'post',
        success:function(res,fn){
            fn(res)
        }
    })
    server.v(this)
},
```