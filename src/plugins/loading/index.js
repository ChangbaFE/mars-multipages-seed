import LoadingComponent from "./loading.vue";

/**
 * 自定义 菊花( Loading )组件
 * Based on WeUI
 */

const Loading = {};

let showLoading = false, loadingInstance = null;

Loading.install = function(Vue, options) {
  const opt = {
    duration: '3000'
  };

  for (const element in options) {
    opt[element] = options[element];
  }

  // 1. 添加全局方法或属性
  Vue.prototype.$loading = function(msg, type) {
    const message = msg || '加载中';
    // 逻辑...
    if (type == 'hide') {
      loadingInstance.isShow = showLoading = false;
    }
    else {
      if (showLoading) {
        return;
      }

      if (!loadingInstance) {
        const loadingController = Vue.extend(LoadingComponent);

        loadingInstance = new loadingController().$mount();
        document.body.appendChild(loadingInstance.$el);
      }


      loadingInstance.message = message;
      loadingInstance.isShow = showLoading = true;
    }
  };

  ['show', 'hide'].forEach((type) => {
    Vue.prototype.$loading[type] = (msg) => {
      return Vue.prototype.$loading(msg, type);
    }
  })
}

export default Loading;
