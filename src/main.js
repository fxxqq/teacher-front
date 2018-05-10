// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import utils from './utils/utils.js'
import pop from './utils/pop.js'
Vue.prototype.$utils = utils;
Vue.prototype.$pop = pop;
import api from './api/API.js'
Vue.prototype.$api = api;

Vue.prototype.basePath = ''
    /* import ElementUI from 'element-ui'  全局引入 */
import 'element-ui/lib/theme-chalk/index.css';
import './public/sass/public.scss'
//按需引入
import {
    Button,
    Select,
    Input,
    Header,
    Main,
    Footer,
    Container
} from 'element-ui';
//设置项目中所有拥有 size 属性的组件的默认尺寸均为 'small'
Vue.prototype.$ELEMENT = { size: 'small' };
Vue.use(Button)
Vue.use(Select)
Vue.use(Input)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Container)
    // 使用vue-router设置每个页面的title
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
});
// 重写console.log 实现自己的逻辑
// console.log = (function(oriLogFunc) {
//     return function(sprint, desc, str) {
//         desc && oriLogFunc.call(console, "%c%s", "color:red", "dev_sprint" + sprint, "", 'desc:' + desc);
//         if (str && typeof str == 'string') {
//             oriLogFunc.call(console, "%c%s", "color:green", str);
//         } else {
//             oriLogFunc.call(console, str);
//         }

//     }
// })(console.log);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})