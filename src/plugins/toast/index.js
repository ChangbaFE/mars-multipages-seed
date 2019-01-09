import ToastComponent from "./toast.vue";
/**
 * 自定义 提示框( Toast )组件
 */
let Toast = {};

//避免重复install，设立showToast
let showToast = false, toastInstance = null;

Toast.install = function (Vue, options) {
    const opt = {
        // default type [notify, success, info, error]
        defaultType: 'notify',
        // position
        pos: 'center',
        // duration
        duration: '3000',
    };

    // 使用options 配置
    for (let element in options) {
        opt[element] = options[element];
    }

    // 1. 添加全局方法或属性
    Vue.prototype.$toast = function (msg, type) {
        // 逻辑...
        // const chooseType = type ? type : opt.defaultType;
        console.log(type);
        if (showToast) {
            return;
        }

        if (!toastInstance) {
            // 构造器
            const toastController = Vue.extend(ToastComponent);

            // 创建实例，挂载到文档以后的地方
            toastInstance = new toastController().$mount();
            console.log(toastInstance.$el);
            // 把实例添加到body中
            document.body.appendChild(toastInstance.$el);
        }


        toastInstance.message = msg;
        toastInstance.isShow = showToast = true;
        toastInstance.type = type;

        setTimeout(() => {
            toastInstance.isShow = showToast = false;
            setTimeout(() => {
                document.body.removeChild(toastInstance.$el);
                toastInstance = null;
            }, 1500);
        }, opt.duration);

    };

    // 不同类型
    ['notify', 'success', 'info', 'error'].forEach((type) => {
        Vue.prototype.$toast[type] = (msg) => {
            return Vue.prototype.$toast(msg, type);
        }
    })
}

export default Toast;
