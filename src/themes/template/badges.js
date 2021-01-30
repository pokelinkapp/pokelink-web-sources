import Vue from "vue";
import Badges from "./components/Badges";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Badges),
}).$mount("#app");
