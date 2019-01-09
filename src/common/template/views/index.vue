<template>
    <div class="container">
        <div class="header">Header</div>
        <div class="wrapper">
          <p>Body</p>
          <p>是否微信QQ: {{isQQorWeChat}}</p>
          <p>是否火星: {{isMars}}</p>
          <p>是否唱吧: {{isCB}}</p>
          <p>curuserid: {{curuserid}}</p>
          <p>token: {{token}}</p>
        </div>
        <div class="footer">Footer</div>
    </div>
</template>

<script>

export default {
  name: 'List',
  data() {
    return {
      isQQorWeChat: /micromessenger/.test(navigator.userAgent.toLowerCase()) || /qq\//.test(navigator.userAgent.toLowerCase()) || /weibo/.test(navigator.userAgent.toLowerCase()),
      isMars: /easylive/.test(navigator.userAgent.toLowerCase()),
      isCB: /changba/.test(navigator.userAgent.toLowerCase()),
      curuserid: commonObj.utils.getQueryStrFn('curuserid'),
      token: commonObj.utils.getQueryStrFn('token'),
      loading: false,
      list: [],
    }
  },
  computed: {
  },
  mounted() {
  },
  created() {
    this.getList();
  },
  methods: {
    // get接口 范例
    async getList() {
      this.$loading.show();
      const params = {
          'ac': 'getlist',
          'curuserid': '57'
      }
      const res = await this.$request.get('/api/get_weeklyrichrank_api.php', params);
      if (res.code === 1000) {
          this.list = res.ranklist;
          this.$loading.hide();
      }
    },
    // 跳转逻辑 范例
    goPage(item) {
      let redirectUrl = 'javascript:;';
      // 火星跳转逻辑
      if (this.isMars) {
        if (item.sessionid > 0) {
          redirectUrl = `xiaochangmars://?ac=live&uid=${item.userid}&sid=${item.sessionid}`;
        }
        else {
          redirectUrl = `xiaochangmars://?ac=userinfo&uid=${item.userid}`;
        }
      }
      // 唱吧跳转逻辑
      else if (this.isCB) {
        if (item.sessionid > 0) {
          redirectUrl = `changba://?ac=live&uid=${item.userid}&sid=${item.sessionid}`;
        }
        else {
          if (item.cbuserid > 0) {
            redirectUrl = `changba://?ac=personalpage&userid=${item.cbuserid}`;
          }
        }
      }
      // 其他
      else {
        redirectUrl = `https://mars.changba.com/download/mars_download.php`
      }
      window.location.href = redirectUrl;
    },
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/sass/base/mixins";

$bg-color: #fff;
$font-color: #000;
.container {
  max-width: 10rem;
  height: 100%;
  margin: 0 auto;
  background-color: $bg-color;
  font-size: 28px;
  color: $font-color;
  .header{
    display: flex;
    padding: 20px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .wrapper{
    display: flex;
    padding: 20px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .footer{
    display: flex;
    padding: 20px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
}
</style>
