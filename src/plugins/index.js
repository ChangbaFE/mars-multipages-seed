import Toast from "@/plugins/toast/index";
import Loading from "@/plugins/loading/index";
import ProgressBar from "@/plugins/progressbar/index";
import Modal from "@/plugins/modal/index";
import request from "@/plugins/fetch/request";


const install = function(Vue) {
  Vue.use(Toast);
  Vue.use(Loading);
  Vue.use(ProgressBar);
  Vue.use(Modal);

  Vue.prototype.$request = request;
}

export default install
