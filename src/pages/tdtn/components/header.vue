<template>
<!-- 主容器 -->
    <section class="header">
        <div id="rich-btn" class="rich-btn">消费榜</div>
        <div class="rule clearfix">
            <span>活动规则<i class="triangle-right"></i></span>
        </div>
    </section>
    <!-- <section class="tab-list">
        <div class="bd">
            <div class="tab hide" id="stub"></div>
            <ul class="tab clearfix" id="tab-box">
                <li id="tab-first" class="active">
                    <span>新秀歌手榜</span>
                </li>
                <li id="tab-second">
                    <span>实力歌手榜</span>
                </li>
            </ul>
        </div>
    </section>
    <section style="min-height: 8rem;">
        <div class="tab-content" id="content-box">
            <div class="tab-pane active" id="content-first">
            </div>
            <div class="tab-pane" id="content-second">
            </div>
        </div>
    </section> -->
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'Header'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../common/sass/mixin";
@import "../wuyuetian.scss";

.header {
    height: 450px; 
}
#rich-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 75px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    @include radius(15px);
    background: #5f6ac5;
    color: #fff;
    font-size: 15px;
}

.rule {
    position: absolute;
    top: 300px;
    right: 45px;
    height: 50px; 
    width: 170px;
    display: flex;
    @include radius(50px);
    background-color: #4954b9;
    color: #fff;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    span {
        display: flex;
        align-items: center;
        font-size: 24px;
        .triangle-right {
            display: flex;
            width: 0;
            height: 0;
            margin-left: 5px;
            border-top: .08rem solid transparent;
            border-left: .106667rem solid #fff;
            border-bottom: 0.08rem solid transparent;
        }
    }
}

</style>
