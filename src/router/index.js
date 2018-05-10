import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Login from '@/page/login/login'
import CourseCenter from '@/page/courseCenter/courseCenter'
import CourseComment from '@/page/courseComment/courseComment'
import Scheduling from '@/page/scheduling/scheduling'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        // {
        //       path: '/',
        //       name: 'HelloWorld',
        //       component: HelloWorld
        //   },
        {
            path: '*',
            component: Login,
            meta: {
                title: 'Login'
            }
        },
        {
            path: '/teacher/login',
            name: 'Login',
            component: Login,
            meta: {
                title: '教师端登录中心'
            }
        },
        {
            path: '/teacher/courseCenter',
            name: 'CourseCenter',
            component: CourseCenter,
            meta: {
                title: 'CourseCenter'
            }
        },
        {
            path: '/teacher/courseComment',
            name: 'CourseComment',
            component: CourseComment,
            meta: {
                title: 'CourseComment'
            }
        },
        {
            path: '/teacher/scheduling',
            name: 'Scheduling',
            component: Scheduling,
            meta: {
                title: '首页入口'
            }
        },
    ]

})