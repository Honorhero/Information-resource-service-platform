import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/reset.css";
import ElementUI from "element-ui";
import * as filters from "./filters/index";
// import "element-ui/lib/theme-chalk/index.css";
import "./styles/element-variables.scss";
import "./styles/index.scss";
// import { soundManager } from "soundmanager2"; // 引入soundManage, 音频播放

import common from "./utils/common";
Vue.prototype.common = common;
// Vue.prototype.soundManager = soundManager;

Vue.use(ElementUI, { size: "small" });

Vue.prototype.BASE_URL = window.apiHost; // 接口地址

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
