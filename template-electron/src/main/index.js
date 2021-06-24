import index from './views/Index'

// 模块路由
export const moduleRoute = [{
    path: '/',
    name: '首页',
    component: index,
    children: [
        
    ]
}]

// 基础路由
const mainRoute = [
    {
        path: '/login',
        name: '登录',
        component: (resolve) => require(['./views/Login.vue'], resolve)
    }, {
        path: '/401',
        name: '无权访问',
        component: (resolve) => require(['./views/401.vue'], resolve)
    }, {
        path: '/404',
        name: '找不到页面',
        component: (resolve) => require(['./views/404.vue'], resolve)
    }
]

export default [
    ...moduleRoute,
    ...mainRoute
];