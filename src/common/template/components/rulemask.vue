<template>
    <transition name="fade">
        <div class="rule-mask" id="rulemask" v-show="isShow">
            <div class="rule">  
                <div class="title">
                    <div class="hd">
                        <p>主题：活动title</p>
                    </div>
                </div>
                <div class="content">
                    <div class="para">
                        <div class="hd">
                            <p>活动规则：</p>
                        </div>
                        <div class="bd">
                            <p>1. 活动期间，所有火星粉丝0-100的主播，每日首次开播，官方账号则赠送9个火星人礼物作为开播奖励</p>
                            <p>2. 奖励的礼物在主播开播5分钟后由官方账号“火星现场”送出</p>
                            <p>3. 截止至11月4日23:59:59，排行榜累计观众数top5的主播会有额外奖励</p>
                            <p>4. 活动期间，若主播的粉丝有增长且超过100人，其榜单排名的数据则停止更新</p>
                            <p>5. 若发现有刷榜行为的用户，系统判断其违规并移除本次活动</p>
                        </div>
                    </div>
                </div>
                <i class="close-btn-icon" id="closeBtn" @click="hide"></i>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "RuleMask",

    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
    },
    methods: {
        hide: function () {
            this.$emit('hideRule');
        }
    }
}
</script>

<style lang="scss" scoped>
.rule-mask {
    // display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    font-size: 0.37333333rem;
    background-color: rgba(0, 0, 0, 0.8);
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    z-index: 100;
    .rule {
        position: relative;
        margin-top: 3.2rem;
        margin-bottom: 2rem;
        border-radius: 0.333333rem;
        background:#242c62; /* 一些不支持背景渐变的浏览器 */  
        font-size: 0.373333rem;
        color: #fff;
        line-height: 1.2;
        .title {
            position: relative;
            padding: 0.4rem 0.2rem;
            .hd {
                text-align: left;
            }
        }
        .content {
            position: relative;
            .para {
                text-align: left;
                .hd {
                    position: relative;
                    display: block;
                    width: 2.266667rem;
                    height: 0.666667rem;
                    line-height: 0.666667rem;
                    background-color: #18e250;
                    border-radius: 0 0.666667rem 0.666667rem 0;
                    text-align: center;
                    color: #342e5f;
                }
                .bd {
                    padding: 0.4rem 0.2rem;
                }
            }
        }
        .close-btn-icon {
            position: absolute;
            display: block;
            bottom: -1.2rem;
            right: 0;
            left: 50%;
            -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            -o-transform: translateX(-50%);
            transform: translateX(-50%);
            width: 0.866667rem;
            height: 0.866667rem;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAMAAAC5KTl3AAAAnFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+TINBkAAAAM3RSTlMA/BJqGQUI+SfyukWUrzcM7+B52tfTi27lUcvCt3JKLT3pIPa0mYFO6MWrpIdgXDJem43PcOeqAAACaUlEQVRYw62Y6XaiQBCFq2mQ3biBuETDRBOzmJj53v/d5oyZBZFGTOf7J55zD13L7SrEhNfXSTQeKNRgHCW678lVOHoTckq40Y50JU59YLLVceB44jlBrLcTwE9j6cJsDmq5d2uP3f1SwXwml1gvoBi50oQ7KmCxljZ6uaLUnjm8ukTlPTESzFGJ0x7jRDEPxMAqZNiXS/SHhCtpZK9InS6pTlF7aeAWHqQbD3ArZ7yBlq5oeJMaj4qpdGeKeqxlIeRVruGVMDipg4xUruOZrFoXOUNHruNmTF4pZaX6ci19pf4X+IJEridh8S8PlNUzvEfGE8VetbJK/nbqnGlVYEDmmHL44p38nP8RpqxGNQIy11C1vFQzWPJpOSmjkyA/AZMGiRHgz06fpMfj+MoVg0S7gLjKd441vqynegGM3QaBRzlliT6e+yCNEj9q7Yi/Om/HSKTnc37mXgQMKxKvwP0xbPVj9OSOicglibxZQCTjTjQfjZ67rEj8NAnIB1oSbptteQMUwWf5QngnzSWSSITBNr30KNEqICsiGROIQeIZ2K23wMDUugETGeBIm4TfJiAuhfi0XFEvAAzezT5DKCBmvCHAQcyA/TvYx8E+F/b1YF+T3fuiUWKLNvXmsnNv2vmD89sfJOLtTKDZo+6bPKq7Tz6YfdLeq+3vC4nZffHO2hF/070pM3Zfurt3zKznB/sZxnqOsp/lrOdJ65nWdq4+WM/21vuF/Y5jIMhQ+U17GeSKLGjf9Yppz/z/tDjuem2sn6A07pslPK077ryHuoh72Bh23va9273puHfb7/7m7w8QFu3fH34BSidt/YeUrg8AAAAASUVORK5CYII=);
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


