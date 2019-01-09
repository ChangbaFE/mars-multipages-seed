<template>
  <div class="list-item">
    <div class="num">
      {{ index + 1 }}
    </div>
    <div class="avatar" :class="avatarCrown">
      <img :src="item.headphoto | prefixAvatar" class="img-circle lazyload" :class="imgCircle" alt="avatar">
    </div>
    <div class="name">
      <div class="username">
        <p class="text-nowrap">
          {{ item.nickname }}
        </p>
      </div>
      <span class="live-icon" v-show="item.sessionid > 0">Live标签</span>
    </div>
    <div class="action">
      <div class="count">
        <p class="text-nowrap">{{item.count}}人观看</p>
      </div>
      <span class="btn" :class="[item.isfollow == 0 ? 'follow-btn' : 'following-btn']" @click="follow(item)" @click.stop>{{ item.isfollow == 0 ? '关注' : '已关注'}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",

  props: {
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    curuserid: {
      type: Number
    },
    token: {
      type: String,
      default: ''
    }
  },
  computed: {
    // imgCircle: function() {
    //     return this.index < 3 ? `border-${this.index}` : 'border-n';
    // },
    // avatarCrown: function() {
    //     return this.index < 3 ? `crown-${this.index}` : ''
    // }
  },
  methods: {
    // 关注接口 范例
    async follow(item) {
      const followid = item.userid;
      const cbfollowid = item.cbuserid;
      const isfollow = item.isfollow;
      //关注自己
      if (followid === this.curuserid || cbfollowid === this.curuserid) {
        this.$modal.show({
          content: '您时时刻刻都在关注着你自己个儿哦~~'
        });
        return;
      }
      // 已关注
      if (isfollow == 1) {
        return;
      }
      else {
        const params = {
          ac: 'follow',
          curuserid: this.curuserid,
          followid: followid,
          cbfollowid: cbfollowid,
          token: this.token
        }

        const fRes = await this.$request.post('/api/mars_follow_api.php', params);

        if (fRes && fRes.errorCode == 0) {
          console.log(fRes);
          item.isfollow = 1;
        }
        else {
          this.$toast.error('关注失败！')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// CSS
.list-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0.266667rem 0.266667rem 0.266667rem;
    border-bottom: 2px solid #382015;
    .num {
        display: flex;
        width: 0.666667rem;
        height: .4rem;
        font-size: 0.426667rem;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    .avatar {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.866667rem;
        height: 1.866667rem;
        margin-right: 0.4rem;
        margin-left: 0.2rem;
        .img-circle {
            width: 100%;
            height: 100%;
            -moz-border-radius: 50%;
            -webkit-border-radius: 50%;
            border-radius: 50%;
        }
    }
    .name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 2.8rem;
        .username {
            display: flex;
            font-size: 0.426667rem;
            color: #fff;
            max-width: 2.8rem;
            line-height: 1.5;
        }
        .live-icon {
            display: flex;
            width: 1.2rem;
            height: 0.4rem;
            justify-content: center;
            align-items: center;
            -webkit-border-radius: 0.4rem;
            -moz-border-radius: 0.4rem;
            -ms-border-radius: 0.4rem;
            -o-border-radius: 0.4rem;
            border-radius: 0.4rem;
            background: #ff4963;
            color: #fff;
            font-size: 0.32rem;
        }
    }
    .action {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        width: 3.2rem;
        .count {
            display: flex;
            max-width: 3.2rem;
            color: #fff;
            font-size: 0.426667rem;
            line-height: 1.5;
        }
        .btn {
            display: flex;
            width: 2.133333rem;
            height: 0.666667rem;
            justify-content: center;
            align-items: center;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            -webkit-border-radius: 0.666667rem;
            -moz-border-radius: 0.666667rem;
            -ms-border-radius: 0.666667rem;
            -o-border-radius: 0.666667rem;
            border-radius: 0.666667rem;
            font-size: 0.4rem;
        &.follow-btn {
            background: #ff4963;
            color: #fff;
        }
        &.following-btn {
            background: #565f39;
            color: #2c120c;
        }
        }
    }
    .border-0 {
        border: 4px solid #ffff00;
    }
    .border-1 {
        border: 4px solid #d8d8d8;
    }
    .border-2 {
        border: 4px solid #f15561;
    }
    .border-n {
        border: 4px solid #fff;
    }
    .crown-0:before {
        content: ' ';
        position: absolute;
        display: inline-block;
        width: 0.626667rem;
        height: 0.586667rem;
        top: -0.1rem;
        left: -0.05rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAsCAMAAADCbREwAAAAolBMVEUAAAD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wD6/wCB+8hWAAAANXRSTlMA/AL6CuSzDfXHYCEHBO3pzacp8dLCr46Ea2VYNC8cEd/av7t7U5R2cGlOR0EeF7maWz46ndXilxcAAAGuSURBVEjHlZTplqIwEIUryI7IDgq4a7vbPd1z3//V5nCGJRJo8PtjwvmuVlkJNI6VRe+Qbrb3N3R5Auyk8b6mAO6gdfHlavntKoM1AGHe7D6fA77JgLTZRsm0U6u7ugVA3jwOwmWHHX9ldeBo/ng+VQCJqBuAsWq2P0y5lIkQ0HPBj8AgcbUpCJQkuz/9GADUdbv21GUx15asFJqOEucqzOWhmbEm8WPlUUnENnZHqVozvMBSErnpytfDpgIPLUJf9J8uw26+Wtt0Rhv90DE0EwzYRMYEIrO16PtbTNCJM++a8XQPxiCiLGxes+rBztERmJmvpauzTfVjC4iBD5lesIpn5fpUCBM+sBVu+zIAzPootgKnjiYzQ71ci39LU1EGqk+t+/6tDLiet9eBl0BMffwBR9kzO1Mv1lYION/Uj62ihWvRbxxaesR3OtzAngbIwLPr024LWaoPwvC3pwzef9/pvqviS4c9ynNZE9p9uvQBON5pnszAQf3I5wPlqg6OCQ1hHQI03GkQLWvqWdAYrlFZk0PjWCZC8QOYRU1HGs/xExt6h/zvmt5iSr/zD6rwcbiScAXdAAAAAElFTkSuQmCC);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .crown-1:before {
        content: ' ';
        position: absolute;
        display: inline-block;
        width: 0.626667rem;
        height: 0.586667rem;
        top: -0.1rem;
        left: -0.05rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAsCAMAAADCbREwAAAAjVBMVEUAAADZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dlLPb/kAAAALnRSTlMA/AUK+rPku2AO9cfBayHu6ac9KR3x39HMhGdYNC8S2ZSOe1NGdnBOF6+aWxudylEMYgAAAZ5JREFUSMeVlOmWqjAQhDtI2EF2UHBfZ+7cev/HGz0TBEyU+P2xk1N1rKRJkx4/EX3CstykpM/MBAJDX+9aQD0dIpt1ZVpbkxmATduv7OuE3mHAsl8GO3X+x+6xANp+v6hWJMO/m0d9cNIkow5gJ8t9wM/7ZcqsUDgqwGslfQCGYUwLhbVrjtfsCzf4WrrBmvGBfmbhhgdBfJH6krvOlzts6wiuuh8/OBhdzTCCOSRz9Kzv/M+R4Ikqk/XXmsFe/KwNOuMZb28oGgsGlIFvQma+lvVZCRNK4oWqx4YNxiBjhaMw0aOxCygMc2dGQ/i87P4shGzYjtUU3fdEfcINc2jYSK99VQBdN4Anw0nxmhqfh5f7bbkcwtD9uur3l/uoksT2gJGB0yv+YYA4MzvTS6KNZIjfTSmD44n6/RTcY0wgTqp5AJsmaPTkx1A0O9SSLxmSvypWv1V56LBcfJcPqtfTewvEyWmxnWPAu0F83lPLPQwwaYpoX6AnpUncps8Tkg6XQGSKSY/VToTXxrlnOpA+BxslfUL7f00fYdB7fgE9uGHl8zeKkgAAAABJRU5ErkJggg==);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .crown-2:before {
        content: ' ';
        position: absolute;
        display: inline-block;
        width: 0.626667rem;
        height: 0.586667rem;
        top: -0.1rem;
        left: -0.05rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAsCAMAAADCbREwAAAAhFBMVEUAAADvVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF7vVF6TRL1QAAAAK3RSTlMA+gQNMglgHfDHtGtZ9NTNsac9Iezo5eLdwr+6k4R4ZxFTTSsnm4xwRRd9BBcFGgAAAZlJREFUSMe1lNeagyAQRgd7b4k1ien1f//3283nGhUw6sWeK+A7A0MZ6H8wV4v0fV4kC3SdAZUy31dzIJxO4qy2zSTMJ+cEAq3rbZ4TvgFg33XLmy7VPrt6WIDWDVvvxQSiq/cJOBpJfKEW4CbqNmCbXTdB5p6bZgD44gIlAKWXWwYr23qP5znCL86Bz30fsqjnq9lb8/FHehLO0FSNSFV61zrAkZ2PXR2Vts35zCCRk59dzSYiBkdwEf1nCFQ786DQHTz+S5ddLAPy0mYQWR9E/1KgUUV7p8l2XIHJAnJ3UAGrz8XuIAmwjGHqzrpoF3MhBmx1Lun3GDXU4AMKodrPFtDeRuP0/FpS0Z4duaf3aakOhgFMldefaSOM440PDAIiGsMDBwPYnUZZBbzP0oTGURxwhN9/wZrTS26nExvYEC3xqzHt4erK5yFMz75niBs/ldeq+Okws3mXHYEyeopbII3r3XaNHjSOfq9Jc3z0YDTF6mWhI6FJVK/Lx6U5nErW6CnNQ7txyU9iWACONJ/jBgUtQbsevgs/TFBc8iYWdk8AAAAASUVORK5CYII=);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}

</style>


