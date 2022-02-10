// 全局组件
import Header from '@/main/components/Header.vue'

export const components = {
    // 内置组件
    CURD:  () => import(/* webpackChunkName: "global-components" */ "@/core/components/CURD.vue"),
    InputNumber:  () => import(/* webpackChunkName: "global-components" */ "@/core/components/InputNumber.vue"),
    InputPassword:  () => import(/* webpackChunkName: "global-components" */ "@/core/components/InputPassword.vue"),
    DictRadio:  () => import(/* webpackChunkName: "global-components" */ "@/core/components/DictRadio.vue"),
    DictCheckbox:  () => import(/* webpackChunkName: "global-components" */ "@/core/components/DictCheckbox.vue"),
    DictSelect:  () => import(/* webpackChunkName: "global-components" */ "@/core/components/DictSelect.vue"),
    DictCascader:  () => import(/* webpackChunkName: "global-components" */ "@/core/components/DictCascader.vue"),
    // 业务组件
    Header,
    Breadcrumb: () => import(/* webpackChunkName: "global-components" */ "@/main/components/Breadcrumb.vue"),
    SubNav: () => import(/* webpackChunkName: "global-components" */ "@/main/components/SubNav.vue"),
    Pagination: () => import(/* webpackChunkName: "global-components" */ "@/main/components/Pagination.vue"),
}

// 全局过滤器
import { util } from '@/core'

export const filters = {
    date: util.formatDate
}

// 全局方法
export const methods = {
    globalMethod: function(){
        return ('test globalMethod output!')
    }
}

// 指令
export const directives = {
    'auth': {
        // 不开启权限控制时避免v-auth指令报错
    },
    'test': {
        inserted (el) {
            setTimeout(() => {
                el.innerText += ' test directive inject!'
            }, 0)
        }
    }
}

// 实例方法
export const $methods = {
    $myMethod: function(){
        return ('test instance method output!')
    }
}
