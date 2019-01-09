<!-- Toast 组件 -->
<template>
    <!--BEGIN toast-->
    <div class="toast-container" id="toast">
        <div class="toast">
            <div class="toast_t" :class="[pos, isShow ? 'fade-in': 'fade-out']" v-if="type == 'notify'">
                <span>{{ message }}</span>
            </div>
            <div class="toast_weui" :class="[pos, isShow ? 'fade-in': 'fade-out']" v-if="type == 'success' || type == 'error'">
                <div class="weui_mask_transparent"></div>
                <div class="weui_toast">
                    <i class="weui_icon_toast" :class="[type == 'success' ? 'success' : 'error']"></i>
                    <p class="weui_toast_content">{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
    <!--end toast-->
</template>

<script>
export default {
    data () {
        return {
            type: '',
            message: '',
            isShow: false,
            pos: 'center',
        };
    },

    components: {},

    computed: {},

    // mounted: {},

    methods: {}
}

</script>
<style lang='scss' scoped>

@font-face {
  font-weight: normal;
  font-style: normal;
  font-family: "weui";
  src: url('data:application/octet-stream;base64,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') format('truetype');
}

[class^="weui_icon_"]:before,
[class*=" weui_icon_"]:before {
  font-family: "weui";
  font-style: normal;
  font-weight: normal;
  speak: none;
  display: inline-block;
  vertical-align: middle;
  text-decoration: inherit;
  width: 1em;
  margin-right: .2em;
  text-align: center;
  /* opacity: .8; */
  /* For safety - reset parent styles, that can break glyph codes*/
  font-variant: normal;
  text-transform: none;
  /* fix buttons height, for twitter bootstrap */
  line-height: 1em;
  /* Animation center compensation - margins should be symmetric */
  /* remove if not needed */
  margin-left: .2em;
  /* you can be more comfortable with increased icons size */
  /* font-size: 120%; */
  /* Uncomment for 3D effect */
  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
}
/* '' */
.weui_icon_success:before {
  content: "\EA06";
}
/* '' */
.weui_icon_success_circle:before {
  content: "\EA07";
}
/* '' */
.weui_icon_success_no_circle:before {
  content: "\EA08";
}
.weui_icon_cancel:before {
  content: "\EA0D";
}

.toast-container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 2000;
    display: flex;
    .toast {
        // position: absolute;
        // display: flex;
        .toast_t {
            position: absolute;
            display: flex;
            padding: 20px 40px;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 10px;
            font-size: 24px;
            color: white;
            max-width: 500px;
            min-width: 100px;
            overflow: hidden;
            &.center {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            &.bottom {
                left: 50%;
                bottom: 100px;
                transform: translate(-50%, 0);
            }
            &.top-bar-show {
                left: 50%;
                top: 100px;
                transform: translate(-50%, 0);
            }
        }
        .toast_weui {
            .weui_mask_transparent {
                position: fixed;
                z-index: 1000;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
            .weui_toast {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 50000;
                width: 3rem;
                min-height: 3rem;
                background: rgba(40, 40, 40, 0.75);
                text-align: center;
                border-radius: 5px;
                color: #FFFFFF;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .weui_icon_toast {
                margin: 22px 0 0;
                display: block;
                &.success::before {
                    content: '\EA08';
                    color: #FFFFFF;
                    font-size: 90px;
                }
                &.error::before {
                    content: '\EA0D';
                    color: #FFFFFF;
                    font-size: 90px;
                }
            }
            
            .weui_toast_content {
                margin: 15px 0 0 0;
                font-size: 28px;
            }
        }
    }
    
}

/* Animation */
.fade-in {
    -webkit-animation: fadeIn 1s;
    -webkit-animation-fill-mode: forwards;
    animation: fadeIn 1s;
    animation-fill-mode: forwards;
}

.fade-out {
    -webkit-animation: fadeOut 1s;
    -webkit-animation-fill-mode: forwards;
    animation: fadeOut 1s; 
    animation-fill-mode: forwards;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@-webkit-keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@-webkit-keyframes fadeOut {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
/* Animation */ 

</style>