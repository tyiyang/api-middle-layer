import login from './login.js';
import shop from './shop.js';
import pledge from './pledge.js'

import myServer from '../request/request.js'
myServer.parseRouter('login',login)
myServer.parseRouter('shop',shop)
myServer.parseRouter('pledge',pledge)

export default myServer
