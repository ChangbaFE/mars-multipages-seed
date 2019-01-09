<!-- Confirm 组件 -->
<template>
    <div class="weui_dialog_alert" id="confirmModal" v-show="isShow">
        <div class="weui_mask"></div>
        <transition name="bounce">
            <div class="weui_dialog">
                <div class="weui_dialog_hd">
                    <strong class="weui_dialog_title">{{ options.title }}</strong>
                </div>
                <div class="weui_dialog_bd">{{ options.content }}</div>
                <div class="weui_dialog_ft">
                    <a href="javascript:;" class="weui_btn_dialog primary" @click="success">{{ options.confirmText }}</a>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isShow: false,
            options: {
                title: '提示',
                content: '弹窗内容，告知当前页面信息等',
                confirmText: '确定'
            }
        };
    },

    components: {},

    computed: {},

    // mounted: {},

    methods: {
        success() {
            this.isShow = false;
        }
    }
}

</script>
<style lang='scss' scoped>
@import './mixins.scss';

$weuiDialogBackgroundColor: #FAFAFC;
$weuiDialogLineColor: #D5D5D6;
$weuiDialogLinkColor: red;
$weuiDialogLinkActiveBc: #EEEEEE;

.weui_mask {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
}

.weui_dialog {
    position: fixed;
    z-index: 5000;
    width: 85%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $weuiDialogBackgroundColor;
    text-align: center;
    border-radius: 6px;
    overflow: hidden;
    .weui_dialog_confirm & {
        .weui_dialog_hd {
            padding: 1.2em 60px .5em;
        }
        .weui_dialog_bd {
            text-align: left;
        }
    }
}

.weui_dialog_hd {
    padding: 1.2em 0 .5em;
}

.weui_dialog_title {
    font-weight: 400;
    font-size: 34px;
}

.weui_dialog_bd {
    padding: 40px;
    font-size: 30px;
    color: #888;
    word-wrap: break-word;
    word-break: break-all;
}

.weui_dialog_ft {
    position: relative;
    line-height: 84px;
    margin-top: 40px;
    font-size: 34px;
    display: flex;
    a {
        display: block;
        flex: 1;
        color: $weuiDialogLinkColor;
        text-decoration: none;
        @include setTapColor;
        &:active {
            background-color: $weuiDialogLinkActiveBc;
        }
    }
    &:after {
        content: " ";
        @include setTopLine($weuiDialogLineColor);
    }
    .weui_dialog_confirm & {
        a {
            position: relative;
            &:after {
                content: " ";
                @include setLeftLine($weuiDialogLineColor);
            }
            &:first-child {
                &:after {
                    display: none;
                }
            }
        }
    }
}

.weui_btn_dialog {
    &.default {
        color: #353535;
    }
    &.primary {
        color: red;
    }
}

@media screen and (min-width: 1024px) {
    .weui_dialog {
        width: 35%;
    }
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>