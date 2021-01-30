import Vue from "vue";
import Party from "./components/Party.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Party),
}).$mount("#app");
