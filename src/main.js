// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import '../static/css/iview/styles/iview.css';
import VueResource from 'vue-resource';
import cookie from 'js-cookie'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

import '../static/css/bootstrap.min.css'
import '../static/css/style.css'
import '../static/css/main.css'

import $ from 'jquery/dist/jquery.min'
import $$ from 'bootstrap/dist/js/bootstrap.min.js'


import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'

import vueXlsxTable from 'vue-xlsx-table'
import VueCookies from 'vue-cookies'

Vue.use(iView);
Vue.use(VueResource);
Vue.use(VideoPlayer);

Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

Vue.use(vueXlsxTable, {rABS: false})
Vue.use(VueCookies);

Vue.config.productionTip = false;

// Vue.prototype.$baseURL = 'http://help.lkc1621.xyz';
Vue.prototype.$baseURL = 'http://localhost:8005';
// Vue.prototype.$baseURL = 'http://180.76.96.46';
Vue.prototype.$cookie =cookie;

Vue.http.interceptors.push((request, next) => {
  //请求发送前的处理逻辑
  request.headers.set('id', VueCookies.get("usrNo"))
  request.headers.set('role', VueCookies.get("role"))
  next((response) => {
    //请求发送后的处理逻辑
    //根据请求的状态，response参数返回给successCallback或errorCallback
    return response
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
Vue.prototype.$Notice.config({
  top: 90,
  duration: 3
});
Vue.prototype.$Message.config({
  top: 85,
  duration: 3
});
