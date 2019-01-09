import ModalComponent from "./modal.vue";

/**
 * 自定义 模态框( Modal )组件
 * Based on WeUI
 * 
 * 用法：
 * this.$modal.show({ title: '', content: '', confirmText: ''})
 */

let Modal = {};

let showModal = false, modalInstance = null;

Modal.install = function (Vue, options) {
    const opt = {};

    for (let element in options) {
        opt[element] = options[element];
    }

    Vue.prototype.$modal = function (userOpts, type) {
        const content = userOpts && userOpts.content ? userOpts.content : '这是一个弹框~';
        const title = userOpts && userOpts.title ? userOpts.title : '提示';
        const confirmText = userOpts && userOpts.confirmText ? userOpts.confirmText : '确定';

        if (showModal) {
            return;
        }
        if (!modalInstance) {
            const modalController = Vue.extend(ModalComponent);

            modalInstance = new modalController().$mount();

            document.body.appendChild(modalInstance.$el);
        }

        modalInstance.options = {
            title: title,
            content: content,
            confirmText: confirmText
        };

        return new Promise((res, rej) => {
            modalInstance.isShow = showModal = true;

            let success = modalInstance.success;
            modalInstance.success = () => {
                success();
                res('success');
                showModal = false;
            }
        })
        

        // return new Promise(())
    };

    ['show'].forEach((type) => {
        Vue.prototype.$modal[type] = (userOpts) => {
            return Vue.prototype.$modal(userOpts, type);
        }
    })
}

export default Modal;
