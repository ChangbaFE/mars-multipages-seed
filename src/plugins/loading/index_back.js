// import Vue from "vue";
// import LoadingComponent from "./loading.vue";

// /**
//  * 自定义 菊花( Loading )组件
//  * Based on WeUI
//  */

// // let Loading = {};

// let showLoading = false, loadingInstance = null;

// const Loading = function (options) {
//     const opt = {
//         duration: '3000',
//     };

//     for (let element in options) {
//         opt[element] = options[element];
//     }

//     const message = opt.msg ? opt.msg : '加载中';
//     // 逻辑...
//     if (opt.type == 'hide') {
//         loadingInstance.isShow = showLoading = false;
//     }
//     else {
//         if (showLoading) {
//             return;
//         }

//         if (!loadingInstance) {
//             const loadingController = Vue.extend(LoadingComponent);

//             loadingInstance = new loadingController().$mount();
//             document.body.appendChild(loadingInstance.$el);
//         }


//         loadingInstance.message = message;
//         loadingInstance.isShow = showLoading = true;
//     }

//     // return loadingInstance;
//     // 1. 添加全局方法或属性
//     // Vue.prototype.$loading = function (msg, type) {
        
//     // };
// };

// ['show', 'hide'].forEach((type) => {
//     Loading[type] = (options = {}) => {
//         options.type = type;
//         return Loading(options);
//     }
// });

// export default Loading;