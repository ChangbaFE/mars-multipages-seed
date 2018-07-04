<template>
    <div class="item" :model="item" :index="index">
        <div class="media-left">
            <div class="num text-nowrap">{{ index + 1 }}</div>
            <div class="avatar">
                <img src="//cbshowhot.cdn.changbaimg.com/-/905bab36808f28a7/avatar.png" class="img-circle" alt="avatar">
            </div>
        </div>
        <div class="media-left">
            <div class="info">
                <p class="name text-nowrap">{{item.nickname}}</p>
            </div>
        </div>
        <div class="media-right">
            <p class="count text-nowrap">11111人气值</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    index: {
        type: [String, Number]
    },
    item: {
        type: Object,
        required: true,
        userid : {
            type: [String, Number],
            required: true
        },
        cbuserid : {
            type: [String, Number],
            required: true
        },
        headphoto : {
            type: [String],
            required: true
        },
        nickname : {
            type: [String, Number],
            required: true
        },
        sessionid : {
            type: [String, Number],
            required: true
        },
        isfollow : {
            type: [String, Number],
            required: true
        },
    }
  },
  data () {
    return {
      msg: 'item'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../common/sass/mixin";
.item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 0.2rem;
    .media-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .num {
            // color: $num-color;
            font-size: 0.32rem;
            display: flex;
            width: 0.2667rem;
            height: .4rem;
            line-height: .4rem;
            margin-right: 0.3333rem;
        }
        .avatar {
            display: flex;
            left: 0;
            // @include datauri(1.4rem, 1.4rem, $avatar-bg);
        }
        .img-circle {
            width: 1.3rem;
            height: 1.3rem;
            @include radius(50%);
            // @include translate(-50%, -50%);
        }
        .info {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: left;
            width: 3rem;
            height: 1.4rem;
            .name {
                max-width: 3rem;
                font-size: 0.346667rem;
                // color: $name-color;
            }
        }
    }
    .media-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        .count {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            max-width: 3.2rem;
            // color: $count-color;
            font-size: 0.32rem;
            line-height: 1.2;
            
        }
        .action {
            .follow-btn {
                @include center;
                margin-top: 0.1333rem;
                margin-right: 0.05rem;
                width: 1.2667rem;
                height: 0.4rem;
                color: #fff;
                background: linear-gradient(to top right, #7f1cff, #ff4fff);
                border-radius: .36rem;
                font-size: 0.2933rem;
                &.following {
                    color: #6e22ed;
                    background-color: #9774d2;
                }
            }
        }
    }
}
</style>
