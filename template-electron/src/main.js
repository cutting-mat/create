// 建立主线程连接
window.api.send('connect', 'ping')

window.api.on('connect', (arg) => {
    console.log(arg)
})

// 基础库
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局资源
import register from '@/register'
Vue.use(register);

// 路由
import router from './router'

// 应用启动
import App from './App.vue'
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
