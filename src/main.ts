import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from '@/store/index'

// import './service/axios_demo'
// import hyRequest from './service'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)

// 注册element-plus/其他
app.use(globalRegister)

app.use(store)
/**
 *  保证页面刷新后能重重新获取vuex的内容以及重新绑定动态路由
 *  注意：这里必须放在app.use(router)之前
 *  因为 app.use(router)执行的时候，会调用他的 install() 函数，然后 intsall() 会获取当前的path
 *  然后立刻根据 path 去router.routes中匹配组件，如果setupStore函数在app.use(router)之后执行
 *  则动态路由还没加载，只能匹配到not-found页面.
 *  匹配到之后，因为路由守卫是回调函数，没那么快执行
 *  此时会先去执行 setupStore() 加载动态路由
 *  然后再去执行路由守卫，此时打印router.getRoute() 会发现动态路由是加载了的，但是要跳转的页面to匹配的却是not-found，因为早在动态路由加载之前就已经匹配好了
 *  所以必须保证 setupStore() 在前执行，保证动态路由已经加载
 */
setupStore()

app.use(router)

app.mount('#app')
