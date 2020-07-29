import login from './login.js';
import shop from './shop.js';


import myServer from '../request/request.js'
myServer.parseRouter('login',login)
myServer.parseRouter('shop',shop)

export default myServer
