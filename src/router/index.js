import Vue from 'vue'
import Router from 'vue-router'
import SS_login from '@/pages/SS_login'
import SS_studentIndex from "@/pages/SS_studentIndex"
import SS_teacherIndex from "@/pages/SS_teacherIndex"
import SS_teacherPerCourse from "@/pages/SS_teacherPerCourse"
import SS_personalInformation from '@/pages/SS_personalInformation'

Vue.use(Router);

export default new Router({
    linkExactActiveClass:'active',
    routes: [
        {
          path: '/',
          name: 'SS_login',
          component: SS_login
        },
        {
          path: '/SS_studentIndex',
          name: 'SS_studentIndex',
          component: SS_studentIndex,
        },
        {
          path: '/SS_teacherIndex',
          name: 'SS_teacherIndex',
          component: SS_teacherIndex,
        },
        {
          path: '/SS_teacherPerCourse',
          name: 'SS_teacherPerCourse',
          component: SS_teacherPerCourse,
        },
        {
          path: '/SS_personalInfo',
          name: 'SS_personalInformation',
          component: SS_personalInformation
        },
    ]
})
