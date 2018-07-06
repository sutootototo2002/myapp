import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/home.vue';
import login from '../components/admin/login.vue';
import regist from '../components/admin/regist.vue';
import admin from '../components/admin/admin.vue';
import sendmail from '../components/admin/sendmail.vue';
import NotFoundComponent from '../components/NotFoundComponent.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: home
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/sendmail',
            name: 'sendmail',
            component: sendmail
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin
        },
        {
            path: '/regist',
            name: 'regist',
            component: regist
        },
        {
            path: '*',
            name: '404',
            component: NotFoundComponent
        }

    ]
})

export default router;